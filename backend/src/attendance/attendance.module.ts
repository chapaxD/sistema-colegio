import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service.js';
import { AttendanceController } from './attendance.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, PrismaService],
})
export class AttendanceModule {}
