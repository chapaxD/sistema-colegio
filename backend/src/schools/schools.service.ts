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
    const data: any = {
      name: dto.name,
      address: dto.address,
      phone: dto.phone,
      directorName: dto.directorName,
      educationalLevel: dto.educationalLevel,
      licenseExpiry: dto.licenseExpiry ? new Date(dto.licenseExpiry) : undefined,
      licenseStatus: dto.licenseStatus,
    };

    if (dto.slug) {
      const existing = await this.prisma.school.findFirst({
        where: { slug: dto.slug, id: { not: id } }
      });
      if (existing) throw new BadRequestException('El identificador (slug) ya existe');
      data.slug = dto.slug;
    }

    return this.prisma.school.update({
      where: { id },
      data
    });
  }

  async updateLicense(id: number, dto: any) {
    return this.prisma.school.update({
      where: { id },
      data: {
        licenseExpiry: dto.licenseExpiry ? new Date(dto.licenseExpiry) : null,
        licenseStatus: dto.licenseStatus,
      } as any
    });
  }

  async delete(id: number) {
    // Nota: En un sistema real, podrías preferir un "Soft Delete" (isActive: false)
    // Pero si el usuario pide eliminar, borramos en cascada o verificamos.
    // Prisma borrará en cascada si está configurado en el esquema, 
    // si no, fallará por integridad referencial (que es más seguro).
    return this.prisma.school.delete({
      where: { id }
    });
  }
}
