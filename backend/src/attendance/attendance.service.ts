import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { BatchAttendanceDto } from './dto/attendance.dto.js';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

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

  async registerBatch(dto: BatchAttendanceDto, userId: number, schoolId: number) {
    const { date, subjectId, items } = dto;
    
    // Verificar permiso (sacamos el courseId del primer item o de la materia)
    if (items.length > 0) {
      const enrollment = await this.prisma.enrollment.findFirst({ where: { id: items[0].enrollmentId, schoolId } });
      if (enrollment) {
        await this.checkTeacherAssignment(userId, enrollment.courseId, subjectId, schoolId);
      }
    }

    const [year, month, day] = date.split('-').map(Number);
    const attendanceDate = new Date(year, month - 1, day, 0, 0, 0, 0);

    const operations = items.map(item => 
      this.prisma.attendance.upsert({
        where: {
          date_enrollmentId_subjectId: {
            date: attendanceDate,
            enrollmentId: item.enrollmentId,
            subjectId: subjectId
          }
        },
        update: { status: item.status === 'Licencia' ? 'EXCUSED' : item.status },
        create: {
          date: attendanceDate,
          enrollmentId: item.enrollmentId,
          subjectId: subjectId,
          status: item.status === 'Licencia' ? 'EXCUSED' : item.status
        }
      })
    );

    return this.prisma.$transaction(operations);
  }

  async findByCourseAndSubject(courseId: number, subjectId: number, date: string, schoolId: number) {
    const [year, month, day] = date.split('-').map(Number);
    const attendanceDate = new Date(year, month - 1, day, 0, 0, 0, 0);

    return this.prisma.attendance.findMany({
      where: {
        subjectId,
        date: attendanceDate,
        enrollment: {
          courseId,
          schoolId
        }
      },
      include: {
        enrollment: {
          include: { student: true }
        }
      }
    });
  }

  async getMonthlyReport(courseId: number, subjectId: number, year: number, month: number, schoolId: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return this.prisma.attendance.findMany({
      where: {
        subjectId,
        date: {
          gte: startDate,
          lte: endDate
        },
        enrollment: {
          courseId,
          schoolId
        }
      },
      include: {
        enrollment: {
          include: { student: true }
        }
      },
      orderBy: { date: 'asc' }
    });
  }
}
