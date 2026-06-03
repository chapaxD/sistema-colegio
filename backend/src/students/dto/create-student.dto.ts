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

  @IsString()
  @IsOptional()
  ci?: string;

  @IsString()
  @IsOptional()
  tutorName?: string;

  @IsString()
  @IsOptional()
  tutorCi?: string;

  @IsString()
  @IsOptional()
  tutorRelation?: string;

  @IsString()
  @IsOptional()
  tutorOcupacion?: string;

  @IsString()
  @IsOptional()
  tutorInstruccion?: string;

  @IsDateString()
  @IsOptional()
  tutorBirthDate?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsOptional()
  courseId?: number;

  @IsOptional()
  academicYearId?: number;
}
