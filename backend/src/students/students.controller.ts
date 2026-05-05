import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe, Query, Req } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('students')
@UseGuards(AuthGuard('jwt'))
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('debug/academic')
  async debugAcademic(@Req() req) {
    return this.studentsService.debugAcademic(req.user.schoolId);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto, @Req() req) {
    return this.studentsService.create(createStudentDto, req.user.schoolId);
  }

  @Get()
  findAll(@Query('showInactive') showInactive: string, @Req() req) {
    return this.studentsService.findAll(req.user.schoolId, req.user.userId, req.user.role, showInactive);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.studentsService.findOne(id, req.user.schoolId);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: any, @Req() req) {
    return this.studentsService.update(id, updateStudentDto, req.user.schoolId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.studentsService.remove(id, req.user.schoolId);
  }

  @Get('by-rude/:rude')
  findByRude(@Param('rude') rude: string, @Req() req) {
    return this.studentsService.findByRude(rude, req.user.schoolId);
  }
}
