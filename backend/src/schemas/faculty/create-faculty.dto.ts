import {
  IsArray,
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  designation: string;

  // Experience is calculated from this date, so it must be a real calendar date.
  @IsNotEmpty({ message: 'joinedDate is required' })
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
}
