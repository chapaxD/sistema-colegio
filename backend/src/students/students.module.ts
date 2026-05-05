import { Module } from '@nestjs/common';
import { StudentsService } from './students.service.js';
import { StudentsController } from './students.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, PrismaService],
})
export class StudentsModule {}
