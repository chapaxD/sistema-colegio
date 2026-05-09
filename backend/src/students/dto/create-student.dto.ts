import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  rude: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDateString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  courseId?: number;

  @IsOptional()
  academicYearId?: number;
}
