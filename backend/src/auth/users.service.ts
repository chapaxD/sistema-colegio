import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(schoolId: number) {
    return this.prisma.user.findMany({
      where: { schoolId },
      include: { teacher: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async create(dto: any, schoolId: number) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const password = dto.password || (dto.role === 'ADMIN' ? 'admin123' : 'profe123');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        schoolId,
        teacher: dto.role === 'TEACHER' ? {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
          }
        } : undefined
      }
    });
  }

  async remove(id: number, schoolId: number) {
    // Verificar que el usuario pertenezca al colegio
    const user = await this.prisma.user.findFirst({ where: { id, schoolId } });
    if (!user) throw new BadRequestException('Usuario no encontrado');

    // Primero eliminar el registro de docente si existe
    await this.prisma.teacher.deleteMany({ where: { userId: id } });
    return this.prisma.user.delete({ where: { id } });
  }
}
