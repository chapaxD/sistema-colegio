import { Controller, Post, Body, Get, Param, Query, ParseIntPipe, Delete, UseGuards, Req } from '@nestjs/common';
import { GradesService } from './grades.service.js';
import { CreateGradeDto } from './dto/create-grade.dto.js';
import { CreateEvaluationDto, SetEvaluationScoreDto, SetDimensionScoreDto } from './dto/detailed-grades.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('grades')
@UseGuards(JwtAuthGuard)
export class GradesController {
  constructor(private readonly gradesService: GradesService) {}

  @Post('evaluations')
  createEvaluation(@Body() dto: CreateEvaluationDto, @Req() req) {
    return this.gradesService.createEvaluation(dto, req.user.userId, req.user.schoolId);
  }

  @Delete('evaluations/:id')
  deleteEvaluation(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.gradesService.removeEvaluation(id, req.user.userId, req.user.schoolId);
  }

  @Post('evaluations/score')
  setEvaluationScore(@Body() dto: SetEvaluationScoreDto, @Req() req) {
    return this.gradesService.setEvaluationScore(dto, req.user.userId, req.user.schoolId);
  }

  @Get('evaluations')
  getEvaluations(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('subjectId', ParseIntPipe) subjectId: number,
    @Query('period', ParseIntPipe) period: number,
    @Req() req
  ) {
    return this.gradesService.getEvaluationsWithScores(courseId, subjectId, period, req.user.schoolId);
  }

  @Post('dimensions')
  setDimensionScores(@Body() dto: SetDimensionScoreDto, @Req() req) {
    return this.gradesService.setDimensionScores(dto, req.user.userId, req.user.schoolId);
  }

  @Get('dimensions')
  getDimensionScores(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('subjectId', ParseIntPipe) subjectId: number,
    @Query('period', ParseIntPipe) period: number,
    @Req() req
  ) {
    return this.gradesService.getDimensionScores(courseId, subjectId, period, req.user.schoolId);
  }

  @Post('register')
  async register(@Body() dto: CreateGradeDto, @Req() req) {
    return this.gradesService.registerGrade(dto, req.user.userId, req.user.schoolId);
  }

  @Post('batch')
  async registerBatch(@Body() grades: CreateGradeDto[], @Req() req) {
    return this.gradesService.registerBatch(grades, req.user.userId, req.user.schoolId);
  }

  @Get('centralizer/trimester')
  async getTrimesterCentralizer(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Query('period', ParseIntPipe) period: number,
    @Req() req
  ) {
    return this.gradesService.getCourseTrimesterCentralizer(courseId, period, req.user.schoolId);
  }

  @Get('centralizer/annual')
  async getAnnualCentralizer(
    @Query('courseId', ParseIntPipe) courseId: number,
    @Req() req,
    @Query('subjectId') subjectId?: string
  ) {
    return this.gradesService.getCourseAnnualCentralizer(
      courseId, 
      req.user.schoolId,
      subjectId ? parseInt(subjectId) : undefined
    );
  }

  @Get('report/:studentId')
  async getReport(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Query('year', ParseIntPipe) year: number,
    @Req() req
  ) {
    return this.gradesService.getStudentAcademicReport(studentId, year, req.user.schoolId);
  }
}
