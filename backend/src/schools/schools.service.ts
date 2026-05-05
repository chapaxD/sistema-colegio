import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.school.findMany({
      include: {
        _count: {
          select: { users: true, students: true, courses: true }
        }
      }
    });
  }

  async findOne(id: number) {
    const school = await this.prisma.school.findUnique({
      where: { id }
    });
    if (!school) throw new BadRequestException('Colegio no encontrado');
    return school;
  }

  async createWithAdmin(dto: any) {
    const { name, slug, address, phone, adminEmail, adminPassword } = dto;

    // Verificar si el slug ya existe
    const existing = await this.prisma.school.findUnique({ where: { slug } });
    if (existing) throw new BadRequestException('El identificador (slug) ya existe');

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    return this.prisma.school.create({
      data: {
        name,
        slug,
        address,
        phone,
        users: {
          create: {
            email: adminEmail,
            password: hashedPassword,
            role: 'ADMIN'
          }
        }
      }
    });
  }

  async update(id: number, dto: any) {
    return this.prisma.school.update({
      where: { id },
      data: {
        name: dto.name,
        address: dto.address,
        phone: dto.phone,
        directorName: dto.directorName,
        educationalLevel: dto.educationalLevel,
      }
    });
  }
}
