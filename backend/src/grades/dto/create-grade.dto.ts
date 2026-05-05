import { IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateGradeDto {
  @IsInt()
  @Min(0)
  @Max(100)
  score: number;

  @IsInt()
  @Min(1)
  @Max(3)
  period: number;

  @IsInt()
  @IsNotEmpty()
  enrollmentId: number;

  @IsInt()
  @IsNotEmpty()
  subjectId: number;
}
