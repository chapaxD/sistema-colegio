import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  level: string; // Ej: 1ro Primaria

  @IsString()
  @IsNotEmpty()
  parallel: string; // Ej: A
}

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Ej: Matemáticas
}

export class CreateAcademicYearDto {
  @IsInt()
  year: number; // Ej: 2024
}

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsOptional()
  description?: string;
}
