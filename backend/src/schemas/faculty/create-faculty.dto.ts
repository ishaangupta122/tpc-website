import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { toIsoDate } from '../../utils/date.util';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  // Experience is calculated from this date, so it must be a real calendar date.
  @IsNotEmpty({ message: 'joinedDate is required' })
  // The admin sends YYYY-MM-DD; "15 Oct 2026" (the stored format) is accepted too.
  @Transform(({ value }) => toIsoDate(value) || value)
  @IsISO8601(
    { strict: true },
    { message: 'joinedDate must be a valid date in YYYY-MM-DD format' },
  )
  joinedDate: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  education?: string[];

  @IsOptional()
  @IsString()
  image?: string;

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
