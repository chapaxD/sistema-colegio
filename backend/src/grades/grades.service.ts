import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateGradeDto } from './dto/create-grade.dto.js';
import { CreateEvaluationDto, SetEvaluationScoreDto, SetDimensionScoreDto } from './dto/detailed-grades.dto.js';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) { }

  private async checkTeacherAssignment(userId: number, courseId: number, subjectId: number, schoolId: number) {
    const user = await this.prisma.user.findFirst({ where: { id: userId, schoolId } });
    if (!user) throw new BadRequestException('Usuario no válido para esta institución');
    if (user.role === 'ADMIN') return;

    const assignment = await this.prisma.subjectAssignment.findFirst({
      where: {
        teacher: { userId },
        courseId,
        subjectId,
        schoolId
      }
    });

    if (!assignment) {
      throw new BadRequestException('No tiene permiso para gestionar esta materia/curso');
    }
  }

  // --- Dimensiones Fijas (SER, DECIDIR, AUTO) ---
  async setDimensionScores(dto: SetDimensionScoreDto, userId: number, schoolId: number) {
    const enrollment = await this.prisma.enrollment.findFirst({ where: { id: dto.enrollmentId, schoolId } });
    if (!enrollment) throw new BadRequestException('Inscripción no encontrada');
    
    if (dto.syncAll) {
      const subjects = await this.prisma.subject.findMany({ where: { schoolId } });
      const operations = subjects.map(s => 
        this.prisma.dimensionScore.upsert({
          where: {
            enrollmentId_subjectId_period: {
              enrollmentId: dto.enrollmentId,
              subjectId: s.id,
              period: dto.period,
            },
          },
          update: { ser: dto.ser, autoSer: dto.autoSer },
          create: { enrollmentId: dto.enrollmentId, subjectId: s.id, period: dto.period, ser: dto.ser, autoSer: dto.autoSer },
        })
      );
      return this.prisma.$transaction(operations);
    }

    await this.checkTeacherAssignment(userId, enrollment.courseId, dto.subjectId, schoolId);
    
    return this.prisma.dimensionScore.upsert({
      where: {
        enrollmentId_subjectId_period: {
          enrollmentId: dto.enrollmentId,
          subjectId: dto.subjectId,
          period: dto.period,
        },
      },
      update: { ser: dto.ser, autoSer: dto.autoSer },
      create: { enrollmentId: dto.enrollmentId, subjectId: dto.subjectId, period: dto.period, ser: dto.ser, autoSer: dto.autoSer },
    });
  }

  async getDimensionScores(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.dimensionScore.findMany({
      where: {
        subjectId,
        period,
        enrollment: { courseId, schoolId }
      }
    });
  }

  // --- Evaluaciones Dinámicas (SABER, HACER) ---
  async createEvaluation(dto: CreateEvaluationDto, userId: number, schoolId: number) {
    await this.checkTeacherAssignment(userId, dto.courseId, dto.subjectId, schoolId);
    return this.prisma.evaluation.create({ data: dto });
  }

  async removeEvaluation(id: number, userId: number, schoolId: number) {
    const evalItem = await this.prisma.evaluation.findUnique({
      where: { id },
      include: { course: true }
    });
    if (evalItem) {
      if (evalItem.course.schoolId !== schoolId) throw new BadRequestException('No autorizado');
      await this.checkTeacherAssignment(userId, evalItem.courseId, evalItem.subjectId, schoolId);
    }
    return this.prisma.evaluation.delete({ where: { id } });
  }

  async setEvaluationScore(dto: SetEvaluationScoreDto, userId: number, schoolId: number) {
    const evalItem = await this.prisma.evaluation.findUnique({
      where: { id: dto.evaluationId },
      include: { course: true }
    });
    if (!evalItem || evalItem.course.schoolId !== schoolId) throw new BadRequestException('No autorizado');

    if (dto.syncAll && evalItem.dimension === 'SER') {
      const subjects = await this.prisma.subject.findMany({ where: { schoolId } });
      const operations: any[] = [];

      for (const s of subjects) {
        // Buscar si ya existe una evaluación con el mismo título (limpiando espacios)
        let targetEval = await this.prisma.evaluation.findFirst({
          where: { 
            title: evalItem.title.trim(), 
            subjectId: s.id, 
            period: evalItem.period, 
            courseId: evalItem.courseId 
          }
        });

        // Si no existe, crearla con el título limpio
        if (!targetEval) {
          targetEval = await this.prisma.evaluation.create({
            data: { 
              title: evalItem.title.trim(), 
              dimension: evalItem.dimension, 
              subjectId: s.id, 
              period: evalItem.period, 
              courseId: evalItem.courseId 
            }
          });
        }

        operations.push(this.prisma.evaluationScore.upsert({
          where: { evaluationId_enrollmentId: { evaluationId: targetEval.id, enrollmentId: dto.enrollmentId } },
          update: { score: dto.score },
          create: { evaluationId: targetEval.id, enrollmentId: dto.enrollmentId, score: dto.score }
        }));
      }
      return this.prisma.$transaction(operations);
    }

    await this.checkTeacherAssignment(userId, evalItem.courseId, evalItem.subjectId, schoolId);
    return this.prisma.evaluationScore.upsert({
      where: {
        evaluationId_enrollmentId: {
          evaluationId: dto.evaluationId,
          enrollmentId: dto.enrollmentId,
        },
      },
      update: { score: dto.score },
      create: {
        evaluationId: dto.evaluationId,
        enrollmentId: dto.enrollmentId,
        score: dto.score
      },
    });
  }

  async getEvaluationsWithScores(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.evaluation.findMany({
      where: {
        courseId,
        subjectId,
        period,
        course: { schoolId }
      },
      include: {
        scores: true
      }
    });
  }

  async registerGrade(dto: CreateGradeDto, userId: number, schoolId: number) {
    // Para esta nota final, necesitamos verificar la inscripción para sacar el courseId
    const enrollment = await this.prisma.enrollment.findFirst({ where: { id: dto.enrollmentId, schoolId } });
    if (enrollment) {
      await this.checkTeacherAssignment(userId, enrollment.courseId, dto.subjectId, schoolId);
    }

    return this.prisma.grade.upsert({
      where: {
        enrollmentId_subjectId_period: {
          enrollmentId: dto.enrollmentId,
          subjectId: dto.subjectId,
          period: dto.period,
        },
      },
      update: { score: dto.score },
      create: dto,
    });
  }

  async getGradesBySubject(courseId: number, subjectId: number, period: number, schoolId: number) {
    return this.prisma.grade.findMany({
      where: {
        subjectId,
        period,
        enrollment: { courseId, schoolId }
      }
    });
  }

  async registerBatch(grades: CreateGradeDto[], userId: number, schoolId: number) {
    if (grades.length === 0) return [];

    // Verificar permiso para el primero (asumimos que el batch es para la misma materia/curso)
    const enrollment = await this.prisma.enrollment.findFirst({ where: { id: grades[0].enrollmentId, schoolId } });
    if (enrollment) {
      await this.checkTeacherAssignment(userId, enrollment.courseId, grades[0].subjectId, schoolId);
    }

    const operations = grades.map(dto =>
      this.prisma.grade.upsert({
        where: {
          enrollmentId_subjectId_period: {
            enrollmentId: dto.enrollmentId,
            subjectId: dto.subjectId,
            period: dto.period,
          },
        },
        update: { score: dto.score },
        create: dto,
      })
    );
    return this.prisma.$transaction(operations);
  }

  async getStudentAcademicReport(studentId: number, year: number, schoolId: number) {
    const enrollment = await this.prisma.enrollment.findFirst({
      where: { studentId, academicYear: { year }, schoolId },
      include: {
        student: true,
        course: true,
        school: true,
        grades: {
          include: { subject: true },
        },
      },
    });

    if (!enrollment) {
      throw new BadRequestException('Estudiante no inscrito en la gestión seleccionada');
    }

    // Obtener todas las materias para asegurar que el boletín esté completo
    const allSubjects = await this.prisma.subject.findMany({ where: { schoolId } });
    const reportBySubject = {};

    allSubjects.forEach(s => {
      reportBySubject[s.name] = { t1: 0, t2: 0, t3: 0, average: 0, status: 'SIN NOTAS' };
    });

    // Llenar con las notas existentes
    enrollment.grades.forEach((grade) => {
      const subjectName = grade.subject.name;
      if (reportBySubject[subjectName]) {
        reportBySubject[subjectName][`t${grade.period}`] = grade.score;
      }
    });

    // Calcular promedios
    Object.keys(reportBySubject).forEach((subject) => {
      const { t1, t2, t3 } = reportBySubject[subject];
      const count = [t1, t2, t3].filter(n => n > 0).length;
      reportBySubject[subject].average = count > 0 ? (t1 + t2 + t3) / count : 0;
      reportBySubject[subject].status = reportBySubject[subject].average >= 51 ? 'APROBADO' : 'REPROBADO';
    });

    return {
      school: enrollment.school.name,
      student: `${enrollment.student.lastName} ${enrollment.student.firstName}`,
      course: `${enrollment.course.level} ${enrollment.course.parallel}`,
      year,
      subjects: reportBySubject,
    };
  }

  async getCourseTrimesterCentralizer(courseId: number, period: number, schoolId: number) {
    const students = await this.prisma.student.findMany({
      where: {
        schoolId,
        isActive: true as any,
        enrollments: { some: { courseId } }
      },
      include: {
        enrollments: {
          where: { courseId },
          include: {
            grades: { where: { period }, include: { subject: true } }
          }
        }
      }
    });

    const subjects = await this.prisma.subject.findMany({ where: { schoolId } });

    const data = students.map(s => {
      const enrollment = s.enrollments[0];
      const gradesBySubject = {};
      enrollment.grades.forEach(g => {
        gradesBySubject[g.subjectId] = g.score;
      });

      const totalScore = enrollment.grades.reduce((acc, curr) => acc + curr.score, 0);
      const avgScore = subjects.length > 0 ? totalScore / subjects.length : 0;

      return {
        id: s.id,
        fullName: `${s.lastName} ${s.firstName}`,
        grades: gradesBySubject,
        average: Math.round(avgScore),
        status: avgScore >= 51 ? 'APROBADO' : 'REPROBADO'
      };
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));

    return { subjects, students: data };
  }

  async getCourseAnnualCentralizer(courseId: number, schoolId: number, subjectId?: number) {
    const students = await this.prisma.student.findMany({
      where: {
        schoolId,
        isActive: true as any,
        enrollments: { some: { courseId } }
      },
      include: {
        enrollments: {
          where: { courseId },
          include: {
            grades: {
              where: subjectId ? { subjectId } : undefined,
              include: { subject: true }
            }
          }
        }
      }
    });

    const totalSubjects = await this.prisma.subject.count({ where: { schoolId } });

    return students.map(s => {
      const enrollment = s.enrollments[0];
      const scores = { t1: 0, t2: 0, t3: 0 };

      if (subjectId) {
        enrollment.grades.forEach(g => {
          scores[`t${g.period}`] = g.score;
        });
      } else {
        // Promedio general por trimestre
        const periodData = {
          1: { sum: 0, count: 0 },
          2: { sum: 0, count: 0 },
          3: { sum: 0, count: 0 }
        };

        enrollment.grades.forEach(g => {
          periodData[g.period].sum += g.score;
          periodData[g.period].count++;
        });

        [1, 2, 3].forEach(p => {
          scores[`t${p}`] = totalSubjects > 0 ? Math.round(periodData[p].sum / totalSubjects) : 0;
        });
      }

      const total = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
      const avg = total / 3;

      return {
        id: s.id,
        fullName: `${s.lastName} ${s.firstName}`,
        ...scores,
        average: Math.round(avg),
        status: avg >= 51 ? 'APROBADO' : 'REPROBADO'
      };
    }).sort((a, b) => a.fullName.localeCompare(b.fullName));
  }

  async getPedagogicalReportData(courseId: number, schoolId: number) {
    console.log(`Generating Pedagogical Report for Course: ${courseId}, School: ${schoolId}`);
    try {
      if (!courseId || !schoolId) {
        throw new Error('CourseId or SchoolId is missing');
      }

      const students = await this.prisma.student.findMany({
        where: {
          schoolId: Number(schoolId),
          enrollments: { some: { courseId: Number(courseId) } }
        },
        include: {
          enrollments: {
            where: { courseId: Number(courseId) },
            include: {
              attendances: true,
              grades: true
            }
          }
        }
      });

      // Importante: Casteamos a any para que TS permita el acceso a gender/phone
      // mientras se sincronizan los tipos generados de Prisma.
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

      const reprobados = studentList.map(s => {
        const enrollment = s.enrollments?.[0];
        if (!enrollment || !enrollment.grades || enrollment.grades.length === 0) return null;
        const avg = enrollment.grades.reduce((acc, curr) => acc + curr.score, 0) / enrollment.grades.length;
        if (avg < 51) {
          return { id: s.id, fullName: `${s.lastName} ${s.firstName}`, phone: s.phone || 'S/N', average: Math.round(avg) };
        }
        return null;
      }).filter(Boolean);

      const subjects = await this.prisma.subject.findMany({
        where: { schoolId: Number(schoolId) },
        orderBy: { name: 'asc' }
      });

      return { stats, attendanceIssues, reprobados, subjects };
    } catch (err) {
      console.error('FATAL ERROR in getPedagogicalReportData:', err.message);
      throw err;
    }
  }
}
