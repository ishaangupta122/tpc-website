import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateAicteCourseDto {
  @IsString()
  @IsNotEmpty()
  department: string;

  @IsInt()
  @Min(0)
  @Max(100000)
  approvedIntake: number;
}

export class UpdateAicteCourseDto extends PartialType(CreateAicteCourseDto) {}
