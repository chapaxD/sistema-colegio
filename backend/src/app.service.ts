import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Sistema Colegio API Activa';
  }

  async getStats(schoolId: number) {
    const [students, courses, subjects, grades] = await Promise.all([
      this.prisma.student.count({ where: { isActive: true, schoolId } }),
      this.prisma.course.count({ where: { schoolId } }),
      this.prisma.subject.count({ where: { schoolId } }),
      this.prisma.grade.aggregate({
        _avg: { score: true },
        where: { score: { gt: 0 }, subject: { schoolId } }
      })
    ]);

    // Obtener actividad reciente de 3 fuentes filtrada por colegio
    const [recentEnrollments, recentGrades, recentAttendance] = await Promise.all([
      this.prisma.enrollment.findMany({
        take: 5,
        where: { schoolId },
        orderBy: { createdAt: 'desc' },
        include: { student: true, course: true }
      }),
      this.prisma.grade.findMany({
        take: 5,
        where: { enrollment: { schoolId } },
        orderBy: { updatedAt: 'desc' },
        include: { enrollment: { include: { student: true } }, subject: true }
      }),
      this.prisma.attendance.findMany({
        take: 5,
        where: { enrollment: { schoolId } },
        orderBy: { date: 'desc' },
        include: { enrollment: { include: { student: true } }, subject: true }
      })
    ]);

    const activity = [
      ...recentEnrollments.map(e => ({
        id: `en-${e.id}`,
        type: 'Inscripción',
        description: `Nuevo estudiante ${e.student.lastName} registrado en ${e.course.level}.`,
        date: e.createdAt,
        indicator: 'info'
      })),
      ...recentGrades.map(g => ({
        id: `gr-${g.id}`,
        type: 'Registro de Notas',
        description: `Se actualizó nota de ${g.subject.name} para ${g.enrollment.student.lastName}.`,
        date: g.updatedAt,
        indicator: 'success'
      })),
      ...recentAttendance.map(a => ({
        id: `at-${a.id}`,
        type: 'Asistencia',
        description: `Control de asistencia en ${a.subject.name} - ${a.status}.`,
        date: a.date,
        indicator: 'warning'
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 10);

    return {
      totalStudents: students,
      totalCourses: courses,
      totalSubjects: subjects,
      averageGrade: Math.round(grades._avg.score || 0),
      activity
    };
  }
}
