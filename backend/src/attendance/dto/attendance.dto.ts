import { IsString, IsInt, IsNotEmpty, IsDateString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAttendanceDto {
  @IsDateString()
  date: string;

  @IsInt()
  enrollmentId: number;

  @IsInt()
  subjectId: number;

  @IsString()
  @IsNotEmpty()
  status: string; // PRESENT, ABSENT, LATE, EXCUSED
}

export class AttendanceItemDto {
  @IsInt()
  enrollmentId: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}

export class BatchAttendanceDto {
  @IsDateString()
  date: string;

  @IsInt()
  subjectId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceItemDto)
  items: AttendanceItemDto[];
}
