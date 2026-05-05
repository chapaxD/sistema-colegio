import { Controller, Post, Body, Get, Query, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { BatchAttendanceDto } from './dto/attendance.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('batch')
  async registerBatch(@Body() dto: BatchAttendanceDto, @Req() req) {
    return this.attendanceService.registerBatch(dto, req.user.userId, req.user.schoolId);
  }

  @Get()
  findByFilters(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('subjectId', ParseIntPipe) subjectId: number,
    @Query('date') date: string,
    @Req() req
  ) {
    return this.attendanceService.findByCourseAndSubject(courseId, subjectId, date, req.user.schoolId);
  }

  @Get('monthly')
  getMonthlyReport(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('subjectId', ParseIntPipe) subjectId: number,
    @Query('year', ParseIntPipe) year: number,
    @Query('month', ParseIntPipe) month: number,
    @Req() req
  ) {
    return this.attendanceService.getMonthlyReport(courseId, subjectId, year, month, req.user.schoolId);
  }
}
