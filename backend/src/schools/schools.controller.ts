import { Controller, Get, Patch, Post, Body, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { SchoolsService } from './schools.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('schools')
@UseGuards(JwtAuthGuard)
export class SchoolsController {
  constructor(private readonly schoolsService: SchoolsService) {}

  @Get()
  async findAll(@Req() req) {
    if (req.user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Solo el super administrador puede ver todos los colegios');
    }
    return this.schoolsService.findAll();
  }

  @Post()
  async create(@Body() dto: any, @Req() req) {
    if (req.user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Solo el super administrador puede crear colegios');
    }
    return this.schoolsService.createWithAdmin(dto);
  }

  @Get('my')
  async getMySchool(@Req() req) {
    return this.schoolsService.findOne(req.user.schoolId);
  }

  @Patch('my')
  async updateMySchool(@Body() dto: any, @Req() req) {
    // Solo el ADMIN o SUPER_ADMIN puede editar datos del colegio
    if (req.user.role !== 'ADMIN' && req.user.role !== 'SUPER_ADMIN') {
      throw new ForbiddenException('Solo los administradores pueden editar los datos del colegio');
    }
    return this.schoolsService.update(req.user.schoolId, dto);
  }
}
