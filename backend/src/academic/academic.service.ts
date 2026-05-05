import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateCourseDto, CreateSubjectDto, CreateAcademicYearDto, CreateEventDto } from './dto/academic.dto.js';

@Injectable()
export class AcademicService {
  constructor(private prisma: PrismaService) {}

  // Eventos
  async createEvent(dto: CreateEventDto, schoolId: number) {
    const { title, date, description } = dto;
    return (this.prisma as any).$executeRaw`
      INSERT INTO "Event" (title, date, description, "updatedAt", "schoolId") 
      VALUES (${title}, ${new Date(date)}, ${description || ''}, NOW(), ${schoolId})
    `;
  }

  async findAllEvents(schoolId: number) {
    return (this.prisma as any).$queryRaw`
      SELECT * FROM "Event" 
      WHERE "schoolId" = ${schoolId} AND date >= NOW() - INTERVAL '1 day'
      ORDER BY date ASC
    `;
  }

  async removeEvent(id: number) {
    return (this.prisma as any).$executeRaw`
      DELETE FROM "Event" WHERE id = ${id}
    `;
  }

  // Cursos
  async createCourse(dto: CreateCourseDto, schoolId: number) {
    return this.prisma.course.create({ data: { ...dto, schoolId } });
  }

  async findAllCourses(schoolId: number, userId?: number, role?: string) {
    if (role === 'TEACHER' && userId) {
      return this.prisma.course.findMany({
        where: {
          schoolId,
          assignments: {
            some: {
              teacher: { userId }
            }
          }
        }
      });
    }
    return this.prisma.course.findMany({ where: { schoolId } });
  }

  // Materias
  async createSubject(dto: CreateSubjectDto, schoolId: number) {
    return this.prisma.subject.create({ data: { ...dto, schoolId } });
  }

  async findAllSubjects(schoolId: number, userId?: number, role?: string) {
    if (role === 'TEACHER' && userId) {
      return this.prisma.subject.findMany({
        where: {
          schoolId,
          assignments: {
            some: {
              teacher: { userId }
            }
          }
        },
        orderBy: { sortOrder: 'asc' }
      });
    }
    return this.prisma.subject.findMany({ 
      where: { schoolId },
      orderBy: { sortOrder: 'asc' } 
    });
  }

  async reorderSubjects(orderedIds: number[]) {
    await Promise.all(
      orderedIds.map((id, index) =>
        this.prisma.subject.update({ where: { id }, data: { sortOrder: index } })
      )
    );
    return { ok: true };
  }

  async updateCourse(id: number, dto: CreateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: dto });
  }

  async removeCourse(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }

  async updateSubject(id: number, dto: any) {
    return this.prisma.subject.update({ where: { id }, data: dto });
  }

  async removeSubject(id: number) {
    return this.prisma.subject.delete({ where: { id } });
  }

  // Años Académicos
  async createYear(dto: CreateAcademicYearDto, schoolId: number) {
    return this.prisma.academicYear.create({ data: { ...dto, schoolId } });
  }

  async findAllYears(schoolId: number) {
    return this.prisma.academicYear.findMany({ where: { schoolId } });
  }

  async seedAcademic(schoolId: number) {
    // Gestiones
    const year = await this.prisma.academicYear.upsert({
      where: { 
        year_schoolId: {
          year: 2024,
          schoolId
        }
      },
      update: {},
      create: { year: 2024, schoolId }
    });

    // Cursos
    const courses = [
      { level: '1ro de Primaria', parallel: 'A' },
      { level: '2do de Primaria', parallel: 'A' },
      { level: '3ro de Primaria', parallel: 'A' }
    ];

    for (const c of courses) {
      await this.prisma.course.upsert({
        where: { 
          level_parallel_school: { 
            level: c.level, 
            parallel: c.parallel,
            schoolId
          } 
        },
        update: {},
        create: { ...c, schoolId }
      });
    }

    // Materias
    const subjects = ['Matemáticas', 'Lenguaje', 'Ciencias Naturales', 'Ciencias Sociales', 'Artes Plásticas'];
    for (const s of subjects) {
      await this.prisma.subject.upsert({
        where: { 
          name_schoolId: {
            name: s,
            schoolId
          }
        },
        update: {},
        create: { name: s, schoolId }
      });
    }

    return { message: 'Base académica poblada' };
  }

  async enrollStudent(studentId: number, courseId: number, academicYearId: number, schoolId: number) {
    return this.prisma.enrollment.upsert({
      where: {
        studentId_academicYearId: {
          studentId,
          academicYearId
        }
      },
      update: { courseId },
      create: {
        studentId,
        courseId,
        academicYearId,
        schoolId
      }
    });
  }

  // Asignaciones de Materias
  async createAssignment(dto: { teacherId: number; subjectId: number; courseId: number; academicYearId: number }, schoolId: number) {
    return this.prisma.subjectAssignment.upsert({
      where: {
        subjectId_courseId_academicYearId: {
          subjectId: dto.subjectId,
          courseId: dto.courseId,
          academicYearId: dto.academicYearId
        }
      },
      update: {
        teacherId: dto.teacherId
      },
      create: { ...dto, schoolId }
    });
  }

  async createBatchAssignments(dto: { teacherId: number; subjectId: number; courseIds: number[]; academicYearId: number }, schoolId: number) {
    const operations = dto.courseIds.map(courseId => 
      this.prisma.subjectAssignment.upsert({
        where: {
          subjectId_courseId_academicYearId: {
            subjectId: dto.subjectId,
            courseId,
            academicYearId: dto.academicYearId
          }
        },
        update: {
          teacherId: dto.teacherId
        },
        create: {
          teacherId: dto.teacherId,
          subjectId: dto.subjectId,
          courseId,
          academicYearId: dto.academicYearId,
          schoolId
        }
      })
    );
    return this.prisma.$transaction(operations);
  }

  async findAllAssignments(schoolId: number) {
    return this.prisma.subjectAssignment.findMany({
      where: { schoolId },
      include: {
        teacher: true,
        subject: true,
        course: true,
        academicYear: true
      }
    });
  }

  async removeAssignment(id: number) {
    return this.prisma.subjectAssignment.delete({ where: { id } });
  }

  async findAllTeachers(schoolId: number) {
    return this.prisma.teacher.findMany({
      where: {
        user: { schoolId }
      }
    });
  }

  async findTeacherByUserId(userId: number) {
    return this.prisma.teacher.findUnique({ where: { userId } });
  }

  async updateTeacherByUserId(userId: number, dto: any) {
    return this.prisma.teacher.update({
      where: { userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
      }
    });
  }

  async promoteStudents(dto: { sourceCourseId: number; sourceYearId: number; targetCourseId: number; targetYearId: number }, schoolId: number) {
    const enrollments = await this.prisma.enrollment.findMany({
      where: { 
        courseId: dto.sourceCourseId,
        academicYearId: dto.sourceYearId,
        schoolId
      },
      select: { studentId: true }
    });

    if (enrollments.length === 0) {
      throw new BadRequestException('No se encontraron estudiantes en el curso y gestión de origen');
    }

    const data = enrollments.map(e => ({
      studentId: e.studentId,
      courseId: dto.targetCourseId,
      academicYearId: dto.targetYearId,
      schoolId
    }));

    return this.prisma.enrollment.createMany({
      data,
      skipDuplicates: true
    });
  }

  async findAssignmentByCourseAndSubject(courseId: number, subjectId: number, schoolId: number) {
    if (!courseId || !subjectId) return null;
    return this.prisma.subjectAssignment.findFirst({
      where: {
        courseId,
        subjectId,
        schoolId
      },
      include: {
        teacher: true
      },
      orderBy: { id: 'desc' }
    });
  }
}
