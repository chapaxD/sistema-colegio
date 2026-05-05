import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service.js';
import { SchoolsController } from './schools.controller.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [SchoolsController],
  providers: [SchoolsService, PrismaService],
  exports: [SchoolsService]
})
export class SchoolsModule {}
