import { Module } from '@nestjs/common';
import { GradesController } from './grades.controller.js';
import { GradesService } from './grades.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [GradesController],
  providers: [GradesService, PrismaService],
})
export class GradesModule {}
