import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async findAllSchools() {
    return this.prisma.school.findMany();
  }

  async debugAcademic(schoolId: number) {
    const courses = await this.prisma.course.findMany({ where: { schoolId } });
    const years = await this.prisma.academicYear.findMany({ where: { schoolId } });
    return { schoolId, coursesCount: courses.length, yearsCount: years.length };
  }

  async create(dto: CreateStudentDto, schoolId: number) {
    const existing = await this.prisma.student.findUnique({
      where: { rude: dto.rude }
    });

    if (existing) {
      // Si ya existe en este colegio, devolverlo
      if (existing.schoolId === schoolId) {
        if (!existing.isActive) {
          await this.prisma.student.update({ where: { id: existing.id }, data: { isActive: true } });
        }
        return { ...existing, isExisting: true };
      }
      
      // Si existe en otro colegio, lo "traemos" a este colegio actualizando su schoolId
      // Esto es común en traslados de alumnos.
      const updated = await this.prisma.student.update({
        where: { id: existing.id },
        data: { schoolId, isActive: true },
        include: {
          enrollments: {
            include: { course: true }
          }
        }
      });
      return { ...updated, isExisting: true };
    }

    try {
      const student = await this.prisma.student.create({
        data: {
          ...dto,
          schoolId,
          birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
        },
        include: {
          enrollments: {
            include: { course: true }
          }
        }
      });
      return { ...student, isExisting: false };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  async findAll(schoolId: number, userId?: number, role?: string, showInactive: string = 'false') {
    const where: any = {
      OR: [
        { schoolId },
        { enrollments: { some: { schoolId } } }
      ]
    };

    if (showInactive !== 'true') {
      where.isActive = true;
    }

    if (role === 'TEACHER' && userId) {
      where.enrollments = {
        some: {
          schoolId, // Asegurar que el docente vea inscripciones de este colegio
          course: {
            assignments: {
              some: {
                teacher: { userId }
              }
            }
          }
        }
      };
    }

    return this.prisma.student.findMany({
      where,
      include: {
        enrollments: {
          where: { schoolId }, // Solo incluir inscripciones de este colegio en el listado
          include: { 
            course: true,
            academicYear: true,
            grades: true 
          }
        }
      }
    });
  }

  async findOne(id: number, schoolId: number) {
    return this.prisma.student.findFirst({
      where: { id, schoolId },
      include: {
        enrollments: {
          include: {
            course: true,
            grades: { include: { subject: true } }
          }
        }
      },
    });
  }

  async update(id: number, dto: any, schoolId: number) {
    return this.prisma.student.update({
      where: { id, schoolId },
      data: {
        ...dto,
        birthDate: dto.birthDate ? new Date(dto.birthDate) : null,
      },
      include: {
        enrollments: {
          include: { course: true }
        }
      }
    });
  }

  async remove(id: number, schoolId: number) {
    return this.prisma.student.update({ 
      where: { id, schoolId },
      data: { isActive: false }
    });
  }

  async findByRude(rude: string, schoolId: number) {
    // Buscamos globalmente el RUDE ya que es un identificador único nacional
    return this.prisma.student.findFirst({
      where: { rude }
    });
  }
}
