import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service.js';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      include: { school: true }
    });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role, 
      schoolId: user.schoolId,
      schoolName: user.school.name
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        schoolId: user.schoolId,
        schoolName: user.school.name
      },
    };
  }

  // Método para crear el primer admin si no existe
  async seedAdmin() {
    // 1. Asegurar que exista la escuela de sistema o la primera escuela
    let school = await this.prisma.school.findFirst({ where: { slug: 'sistema' } });
    if (!school) {
      school = await this.prisma.school.upsert({
        where: { slug: 'sistema' },
        update: {},
        create: {
          name: 'Sistema de Gestión Escolar',
          slug: 'sistema',
          address: 'Central'
        }
      });
      console.log('✅ Escuela de sistema creada');
    }

    // 2. Crear o actualizar el Super Admin
    const superEmail = 'admin@colegio.com';
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await this.prisma.user.upsert({
      where: { email: superEmail },
      update: { role: 'SUPER_ADMIN' },
      create: {
        email: superEmail,
        password: hashedPassword,
        role: 'SUPER_ADMIN',
        schoolId: school.id
      }
    });
    console.log('✅ Super Admin configurado: admin@colegio.com / admin123');
  }
}
