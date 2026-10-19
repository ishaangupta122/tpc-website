import { Transform } from 'class-transformer';
import { IsArray, IsISO8601, IsOptional, IsString } from 'class-validator';
import { toIsoDate } from '../../utils/date.util';

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
  // The admin sends YYYY-MM-DD; "15 Oct 2026" (the stored format) is accepted too.
  @Transform(({ value }) => toIsoDate(value) || value)
  @IsISO8601(
    { strict: true },
    { message: 'joinedDate must be a valid date in YYYY-MM-DD format' },
  )
  joinedDate?: string;

  // Profile table sections, sent as JSON strings (multipart form fields).
  @IsOptional()
  @IsString()
  publications?: any;

  @IsOptional()
  @IsString()
  conferences?: any;

  @IsOptional()
  @IsString()
  books?: any;
}
