import {
  IsArray,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateFacultyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: string[];

  @IsOptional()
  @IsString()
  designation?: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsOptional()
  @IsISO8601(
    { strict: true },
    { message: 'joinedDate must be a valid date in YYYY-MM-DD format' },
  )
  joinedDate?: string;
}
