import { IsString, IsInt, IsNotEmpty, IsArray, ValidateNested, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  dimension: string; // SABER, HACER

  @IsInt()
  courseId: number;

  @IsInt()
  subjectId: number;

  @IsInt()
  period: number;
}

export class SetEvaluationScoreDto {
  @IsInt()
  evaluationId: number;

  @IsInt()
  enrollmentId: number;

  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @IsNotEmpty()
  syncAll?: boolean;
}

export class SetDimensionScoreDto {
  @IsInt()
  enrollmentId: number;

  @IsInt()
  subjectId: number;

  @IsInt()
  period: number;

  @IsInt()
  @Min(0)
  @Max(10)
  ser: number;

  @IsInt()
  @Min(0)
  @Max(5)
  autoSer: number;

  @IsNotEmpty()
  syncAll?: boolean;
}
