import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './prisma.service.js';
import { GradesModule } from './grades/grades.module.js';
import { AuthModule } from './auth/auth.module.js';
import { StudentsModule } from './students/students.module.js';
import { AcademicModule } from './academic/academic.module.js';
import { AttendanceModule } from './attendance/attendance.module.js';
import { SchoolsModule } from './schools/schools.module.js';

@Module({
  imports: [AuthModule, GradesModule, StudentsModule, AcademicModule, AttendanceModule, SchoolsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
