import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateGradeDto } from './dto/create-grade.dto.js';
import { CreateEvaluationDto, SetEvaluationScoreDto, SetDimensionScoreDto } from './dto/detailed-grades.dto.js';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async createEvaluation(dto: CreateEvaluationDto, userId: number, schoolId: number) {
    // Verificar que la materia pertenezca al colegio
    const subject = await this.prisma.subject.findFirst({
      where: { id: dto.subjectId, schoolId }
    });
    if (!subject) throw new NotFoundException('Materia no encontrada');

    return this.prisma.evaluation.create({
      data: {
        title: dto.title,
        dimension: dto.dimension,
        courseId: dto.courseId,
        subjectId: dto.subjectId,
        period: dto.period,
      }
    });
  }

  async removeEvaluation(id: number, userId: number, schoolId: number) {
    const evaluation = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { subject: true }
    });

    if (!evaluation || evaluation.subject.schoolId !== schoolId) {
      throw new NotFoundException('Evaluación no encontrada');
    }

    // Primero borrar los puntajes asociados
    await this.prisma.evaluationScore.deleteMany({
      where: { evaluationId: id }
    });

    return this.prisma.evaluation.delete({
      where: { id }
    });
  }

  async setEvaluationScore(dto: SetEvaluationScoreDto, userId: number, schoolId: number) {
    return this.prisma.$transaction(async (tx) => {
      const score = await tx.evaluationScore.upsert({
        where: {
          evaluationId_enrollmentId: {
            evaluationId: dto.evaluationId,
            enrollmentId: dto.enrollmentId,
          }
        },
        update: { score: dto.score },
        create: {
          evaluationId: dto.evaluationId,
          enrollmentId: dto.enrollmentId,
          score: dto.score,
        }
      });

      // Recalcular el promedio de la dimensión y actualizar Grade
      await this.updateSubjectGrade(dto.enrollmentId, dto.evaluationId, tx);

      return score;
    });
  }

  async getEvaluationsWithScores(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.evaluation.findMany({
      where: { courseId, subjectId, period },
      include: {
        scores: true
      }
    });
  }

  async setDimensionScores(dto: SetDimensionScoreDto, userId: number, schoolId: number) {
    const res = await this.prisma.dimensionScore.upsert({
      where: {
        enrollmentId_subjectId_period: {
          enrollmentId: dto.enrollmentId,
          subjectId: dto.subjectId,
          period: dto.period,
        }
      },
      update: {
        ser: dto.ser,
        autoSer: dto.autoSer,
      },
      create: {
        enrollmentId: dto.enrollmentId,
        subjectId: dto.subjectId,
        period: dto.period,
        ser: dto.ser,
        autoSer: dto.autoSer,
      }
    });
    
    // Actualizar la nota final del trimestre para esta materia
    await this.updateSubjectGradeManual(dto.enrollmentId, dto.subjectId, dto.period);
    
    return res;
  }

  async getDimensionScores(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.dimensionScore.findMany({
      where: {
        subjectId,
        period,
        enrollment: { courseId }
      }
    });
  }

  private async updateSubjectGrade(enrollmentId: number, evaluationId: number, tx: any) {
    const evaluation = await tx.evaluation.findUnique({ where: { id: evaluationId } });
    const { subjectId, period } = evaluation;

    // 1. Obtener todas las dimensiones con sus promedios
    const evaluations = await tx.evaluation.findMany({
      where: { courseId: evaluation.courseId, subjectId, period },
      include: { scores: { where: { enrollmentId } } }
    });

    const dimensions = ['SABER', 'HACER', 'DECIDIR'];
    let totalScore = 0;

    for (const dim of dimensions) {
      const dimEvals = evaluations.filter(e => e.dimension === dim);
      if (dimEvals.length > 0) {
        const sum = dimEvals.reduce((acc, curr) => acc + (curr.scores[0]?.score || 0), 0);
        const avg = Math.round(sum / dimEvals.length);
        totalScore += avg;
      }
    }

    // 2. Sumar SER y AUTO-SER
    const dimScore = await tx.dimensionScore.findUnique({
      where: { enrollmentId_subjectId_period: { enrollmentId, subjectId, period } }
    });

    if (dimScore) {
      totalScore += (dimScore.ser || 0) + (dimScore.autoSer || 0);
    }

    // 3. Upsert en Grade
    await tx.grade.upsert({
      where: { enrollmentId_subjectId_period: { enrollmentId, subjectId, period } },
      update: { score: totalScore },
      create: { enrollmentId, subjectId, period, score: totalScore }
    });
  }

  private async updateSubjectGradeManual(enrollmentId: number, subjectId: number, period: number) {
    const enrollment = await this.prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true }
    });

    if (!enrollment) return;

    const evaluations = await this.prisma.evaluation.findMany({
      where: { courseId: enrollment.courseId, subjectId, period },
      include: { scores: { where: { enrollmentId } } }
    });

    const dimensions = ['SABER', 'HACER', 'DECIDIR'];
    let totalScore = 0;

    for (const dim of dimensions) {
      const dimEvals = evaluations.filter(e => e.dimension === dim);
      if (dimEvals.length > 0) {
        const sum = dimEvals.reduce((acc, curr) => acc + (curr.scores[0]?.score || 0), 0);
        const avg = Math.round(sum / dimEvals.length);
        totalScore += avg;
      }
    }

    const dimScore = await this.prisma.dimensionScore.findUnique({
      where: { enrollmentId_subjectId_period: { enrollmentId, subjectId, period } }
    });

    if (dimScore) {
      totalScore += (dimScore.ser || 0) + (dimScore.autoSer || 0);
    }

    await this.prisma.grade.upsert({
      where: { enrollmentId_subjectId_period: { enrollmentId, subjectId, period } },
      update: { score: totalScore },
      create: { enrollmentId, subjectId, period, score: totalScore }
    });
  }

  async getGradesBySubject(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.grade.findMany({
      where: {
        subjectId,
        period,
        enrollment: { courseId }
      },
      include: {
        enrollment: { include: { student: true } }
      }
    });
  }

  async registerGrade(dto: CreateGradeDto, userId: number, schoolId: number) {
    return this.prisma.grade.upsert({
      where: {
        enrollmentId_subjectId_period: {
          enrollmentId: dto.enrollmentId,
          subjectId: dto.subjectId,
          period: dto.period,
        },
      },
      update: { score: dto.score },
      create: { ...dto },
    });
  }

  async registerBatch(grades: CreateGradeDto[], userId: number, schoolId: number) {
    const results: any[] = [];
    for (const g of grades) {
      const res = await this.registerGrade(g, userId, schoolId);
      results.push(res);
    }
    return results;
  }

  async getCourseTrimesterCentralizer(courseId: number, period: number, schoolId: number) {
    const students = await this.prisma.student.findMany({
      where: {
        schoolId,
        enrollments: { some: { courseId } }
      },
      include: {
        enrollments: {
          where: { courseId },
          include: {
            grades: { where: { period } }
          }
        }
      }
    });

    const subjects = await this.prisma.subject.findMany({
      where: { schoolId },
      orderBy: { sortOrder: 'asc' }
    });

    return students.map(s => {
      const enrollment = s.enrollments[0];
      const studentGrades = subjects.reduce((acc, sub) => {
        const grade = enrollment.grades.find(g => g.subjectId === sub.id);
        acc[sub.name] = grade ? grade.score : 0;
        return acc;
      }, {});

      return {
        id: s.id,
        fullName: `${s.lastName} ${s.firstName}`,
        rude: s.rude,
        grades: studentGrades
      };
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getCourseAnnualCentralizer(courseId: number, schoolId: number, subjectId?: number) {
    const students = await this.prisma.student.findMany({
      where: {
        schoolId,
        enrollments: { some: { courseId } }
      },
      include: {
        enrollments: {
          where: { courseId },
          include: {
            grades: true
          }
        }
      }
    });

    const subjects = await this.prisma.subject.findMany({
      where: { 
        schoolId,
        ...(subjectId ? { id: subjectId } : {})
      },
      orderBy: { sortOrder: 'asc' }
    });

    return students.map(s => {
      const enrollment = s.enrollments[0];
      const annualGrades = subjects.reduce((acc, sub) => {
        const t1 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 1)?.score || 0;
        const t2 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 2)?.score || 0;
        const t3 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 3)?.score || 0;
        const avg = Math.round((t1 + t2 + t3) / ( (t1?1:0) + (t2?1:0) + (t3?1:0) || 1 ));
        
        acc[sub.name] = { t1, t2, t3, annual: avg };
        return acc;
      }, {});

      return {
        id: s.id,
        fullName: `${s.lastName} ${s.firstName}`,
        rude: s.rude,
        subjects: annualGrades
      };
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getStudentAcademicReport(studentId: number, year: number, schoolId: number) {
    const student = await this.prisma.student.findFirst({
      where: { id: studentId, schoolId },
      include: {
        enrollments: {
          where: { academicYear: { year } },
          include: {
            course: true,
            grades: true
          }
        }
      }
    });

    if (!student || !student.enrollments.length) {
      throw new NotFoundException('Estudiante no encontrado para este año');
    }

    const enrollment = student.enrollments[0];
    const subjects = await this.prisma.subject.findMany({
      where: { schoolId },
      orderBy: { sortOrder: 'asc' }
    });

    const reportData = subjects.map(sub => {
      const t1 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 1)?.score || null;
      const t2 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 2)?.score || null;
      const t3 = enrollment.grades.find(g => g.subjectId === sub.id && g.period === 3)?.score || null;
      
      const scores = [t1, t2, t3].filter(s => s !== null);
      const average = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

      return {
        name: sub.name,
        t1, t2, t3,
        average
      };
    });

    return {
      student: `${student.lastName} ${student.firstName}`,
      course: `${enrollment.course.level} ${enrollment.course.parallel}`,
      subjects: reportData.reduce((acc, curr) => {
        acc[curr.name] = { t1: curr.t1, t2: curr.t2, t3: curr.t3, average: curr.average };
        return acc;
      }, {})
    };
  }

  async getPedagogicalReportData(courseId: number, period: number, schoolId: number) {
    console.log(`Generating Pedagogical Report for Course: ${courseId}, Period: ${period}, School: ${schoolId}`);
    try {
      if (!courseId || !schoolId) {
        throw new Error('CourseId or SchoolId is missing');
      }

      const latestYear = await this.prisma.academicYear.findFirst({
        where: { schoolId: Number(schoolId) },
        orderBy: { year: 'desc' }
      });

      if (!latestYear) {
        throw new Error('No se encontró una gestión escolar activa para este colegio');
      }

      const students = await this.prisma.student.findMany({
        where: {
          schoolId: Number(schoolId),
          enrollments: { some: { courseId: Number(courseId), academicYearId: latestYear.id } }
        },
        include: {
          enrollments: {
            where: { courseId: Number(courseId), academicYearId: latestYear.id },
            include: {
              attendances: true,
              grades: { where: { period: Number(period) } },
              learningDifficulties: { where: { period: Number(period) } }
            }
          }
        }
      } as any);

      const studentList = students as any[];

      const stats = {
        enrolled: {
          males: studentList.filter(s => s.gender === 'M').length,
          females: studentList.filter(s => s.gender === 'F').length,
          total: studentList.length
        },
        effective: {
          males: studentList.filter(s => s.gender === 'M' && s.isActive).length,
          females: studentList.filter(s => s.gender === 'F' && s.isActive).length,
          total: studentList.filter(s => s.isActive).length
        }
      };

      const attendanceIssues = studentList.map(s => {
        const enrollment = s.enrollments?.[0];
        if (!enrollment) return null;
        const lates = (enrollment.attendances || []).filter(a => a.status === 'LATE').length;
        const absences = (enrollment.attendances || []).filter(a => a.status === 'ABSENT').length;
        if (lates > 2 || absences > 1) {
          return { id: s.id, fullName: `${s.lastName} ${s.firstName}`, phone: s.phone || 'S/N', lates, absences };
        }
        return null;
      }).filter(Boolean);

      // Obtener solo las materias que están asignadas a este curso en la gestión actual
      const subjects = await this.prisma.subject.findMany({
        where: { 
          schoolId: Number(schoolId),
          assignments: { some: { courseId: Number(courseId), academicYearId: latestYear?.id } }
        },
        orderBy: { name: 'asc' }
      });

      const finalSubjects = subjects.length > 0 ? subjects : await this.prisma.subject.findMany({
        where: { schoolId: Number(schoolId) },
        orderBy: { name: 'asc' }
      });

      const reprobados = studentList.map(s => {
        const enrollment = s.enrollments?.[0];
        if (!enrollment || !enrollment.grades || enrollment.grades.length === 0) return null;
        
        const failedSubjects = (enrollment.grades || [])
          .filter(g => g.score < 51)
          .map(g => finalSubjects.find(sub => sub.id === g.subjectId)?.name || '');
        
        const avg = enrollment.grades.reduce((acc, curr) => acc + curr.score, 0) / enrollment.grades.length;
        if (avg < 51 || failedSubjects.length > 0) {
          return { 
            id: s.id, 
            fullName: `${s.lastName} ${s.firstName}`, 
            phone: s.phone || 'S/N', 
            average: Math.round(avg),
            subjects: Array.from(new Set(failedSubjects)).filter(Boolean).join(' - ')
          };
        }
        return null;
      }).filter(Boolean);

      const strugglingStudents = studentList.map(s => {
        const enrollment = s.enrollments?.[0];
        if (!enrollment || !enrollment.grades) return null;
        
        const lowSubjects = (enrollment.grades || [])
          .filter(g => g.score >= 51 && g.score <= 60)
          .map(g => finalSubjects.find(sub => sub.id === g.subjectId)?.name || '');

        if (lowSubjects.length > 0) {
          return { 
            id: s.id, 
            fullName: `${s.lastName} ${s.firstName}`, 
            phone: s.phone || 'S/N',
            subjects: Array.from(new Set(lowSubjects)).filter(Boolean).join(' - ')
          };
        }
        return null;
      }).filter(Boolean);

      // Cargar reporte pedagógico guardado
      const savedReport = await (this.prisma as any).pedagogicalReport.findUnique({
        where: {
          courseId_period_academicYearId: {
            courseId: Number(courseId),
            period: Number(period),
            academicYearId: latestYear.id
          }
        }
      });

      // Mapear dificultades guardadas
      const savedDifficulties = studentList.map(s => {
        const diff = s.enrollments?.[0]?.learningDifficulties?.[0];
        if (!diff) return null;
        return {
          studentId: s.id,
          fullName: `${s.lastName} ${s.firstName}`,
          subjects: diff.subjects,
          notes: diff.description
        };
      }).filter(Boolean);

      return { 
        stats, 
        attendanceIssues, 
        reprobados, 
        subjects: finalSubjects, 
        strugglingStudents,
        savedReport,
        savedDifficulties
      };
    } catch (err) {
      console.error('FATAL ERROR in getPedagogicalReportData:', err.message);
      throw err;
    }
  }

  async savePedagogicalReport(dto: any, schoolId: number) {
    const latestYear = await this.prisma.academicYear.findFirst({
      where: { schoolId: Number(schoolId) },
      orderBy: { year: 'desc' }
    });

    if (!latestYear) {
      throw new Error('No se puede guardar el reporte: No existe una gestión escolar activa');
    }

    return (this.prisma as any).pedagogicalReport.upsert({
      where: {
        courseId_period_academicYearId: {
          courseId: Number(dto.courseId),
          period: Number(dto.period),
          academicYearId: latestYear.id
        }
      },
      update: {
        area: dto.area,
        avance: dto.avance,
        aprovechamiento: dto.aprovechamiento,
        logros: dto.logros,
        dificultades: dto.dificultades,
        sugerencias: dto.sugerencias,
        subjectsData: dto.subjectsData
      },
      create: {
        courseId: Number(dto.courseId),
        period: Number(dto.period),
        academicYearId: latestYear.id,
        schoolId: Number(schoolId),
        area: dto.area,
        avance: dto.avance,
        aprovechamiento: dto.aprovechamiento,
        logros: dto.logros,
        dificultades: dto.dificultades,
        sugerencias: dto.sugerencias,
        subjectsData: dto.subjectsData
      }
    });
  }

  async saveLearningDifficulties(dto: any, schoolId: number) {
    const latestYear = await this.prisma.academicYear.findFirst({
      where: { schoolId: Number(schoolId) },
      orderBy: { year: 'desc' }
    });

    if (!latestYear) {
      throw new Error('No se pueden guardar las dificultades: No existe una gestión escolar activa');
    }

    const results: any[] = [];
    for (const diff of dto.difficulties) {
      const enrollment = await this.prisma.enrollment.findUnique({
        where: {
          studentId_academicYearId: {
            studentId: Number(diff.studentId),
            academicYearId: latestYear.id
          }
        }
      });

      if (enrollment) {
        const res = await (this.prisma as any).learningDifficulty.upsert({
          where: {
            enrollmentId_period: {
              enrollmentId: enrollment.id,
              period: Number(dto.period)
            }
          },
          update: {
            subjects: diff.subjects,
            description: diff.notes
          },
          create: {
            enrollmentId: enrollment.id,
            period: Number(dto.period),
            subjects: diff.subjects,
            description: diff.notes
          }
        });
        results.push(res);
      }
    }
    return results;
  }
}
