import { Module } from '@nestjs/common';
import { AcademicService } from './academic.service.js';
import { AcademicController } from './academic.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [AcademicController],
  providers: [AcademicService, PrismaService],
})
export class AcademicModule {}
