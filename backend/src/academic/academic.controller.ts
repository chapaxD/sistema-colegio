import { Controller, Get, Post, Body, UseGuards, ParseIntPipe, Param, Delete, Req, Patch } from '@nestjs/common';
import { AcademicService } from './academic.service.js';
import { CreateCourseDto, CreateSubjectDto, CreateAcademicYearDto, CreateEventDto } from './dto/academic.dto.js';
import { AuthGuard } from '@nestjs/passport';

@Controller('academic')
@UseGuards(AuthGuard('jwt'))
export class AcademicController {
  constructor(private readonly academicService: AcademicService) {}

  @Post('events')
  createEvent(@Body() dto: CreateEventDto, @Req() req) {
    return this.academicService.createEvent(dto, req.user.schoolId);
  }

  @Get('events')
  findAllEvents(@Req() req) {
    return this.academicService.findAllEvents(req.user.schoolId);
  }

  @Delete('events/:id')
  removeEvent(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeEvent(id);
  }

  @Post('courses')
  createCourse(@Body() dto: CreateCourseDto, @Req() req) {
    return this.academicService.createCourse(dto, req.user.schoolId);
  }

  @Get('courses')
  findAllCourses(@Req() req) {
    return this.academicService.findAllCourses(req.user.schoolId, req.user.userId, req.user.role);
  }

  @Post('subjects')
  createSubject(@Body() dto: CreateSubjectDto, @Req() req) {
    return this.academicService.createSubject(dto, req.user.schoolId);
  }

  @Get('subjects')
  findAllSubjects(@Req() req) {
    return this.academicService.findAllSubjects(req.user.schoolId, req.user.userId, req.user.role);
  }

  @Post('subjects/reorder')
  reorderSubjects(@Body() body: { orderedIds: number[] }) {
    return this.academicService.reorderSubjects(body.orderedIds);
  }

  @Post('courses/:id')
  updateCourse(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateCourseDto) {
    return this.academicService.updateCourse(id, dto);
  }

  @Delete('courses/:id')
  removeCourse(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeCourse(id);
  }

  @Post('subjects/:id')
  updateSubject(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSubjectDto) {
    return this.academicService.updateSubject(id, dto);
  }

  @Delete('subjects/:id')
  removeSubject(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeSubject(id);
  }

  @Post('years')
  createYear(@Body() dto: CreateAcademicYearDto, @Req() req) {
    return this.academicService.createYear(dto, req.user.schoolId);
  }

  @Get('years')
  findAllYears(@Req() req) {
    return this.academicService.findAllYears(req.user.schoolId);
  }

  @Get('seed')
  seed(@Req() req) {
    return this.academicService.seedAcademic(req.user.schoolId);
  }

  @Post('enroll')
  enroll(@Body() body: { studentId: number; courseId: number; academicYearId: number }, @Req() req) {
    return this.academicService.enrollStudent(body.studentId, body.courseId, body.academicYearId, req.user.schoolId);
  }

  @Post('promote')
  promote(@Body() dto: { sourceCourseId: number; sourceYearId: number; targetCourseId: number; targetYearId: number }, @Req() req) {
    return this.academicService.promoteStudents(dto, req.user.schoolId);
  }

  @Post('assignments')
  createAssignment(@Body() dto: any, @Req() req) {
    return this.academicService.createAssignment(dto, req.user.schoolId);
  }

  @Post('assignments/batch')
  createBatchAssignments(@Body() dto: { teacherId: number; subjectId: number; courseIds: number[]; academicYearId: number }, @Req() req) {
    return this.academicService.createBatchAssignments(dto, req.user.schoolId);
  }

  @Get('assignments')
  findAllAssignments(@Req() req) {
    return this.academicService.findAllAssignments(req.user.schoolId);
  }

  @Delete('assignments/:id')
  removeAssignment(@Param('id', ParseIntPipe) id: number) {
    return this.academicService.removeAssignment(id);
  }

  @Get('teachers')
  findAllTeachers(@Req() req) {
    return this.academicService.findAllTeachers(req.user.schoolId);
  }

  @Get('teachers/me')
  findMyProfile(@Req() req) {
    return this.academicService.findTeacherByUserId(req.user.userId);
  }

  @Patch('teachers/me')
  updateMyProfile(@Req() req, @Body() dto: any) {
    return this.academicService.updateTeacherByUserId(req.user.userId, dto);
  }
  @Get('assignments/lookup')
  findAssignmentLookup(@Req() req, @Param('courseId') cId: string, @Param('subjectId') sId: string) {
    // Note: query params are better here
    return this.academicService.findAssignmentByCourseAndSubject(
      parseInt(req.query.courseId),
      parseInt(req.query.subjectId),
      req.user.schoolId
    );
  }
}
