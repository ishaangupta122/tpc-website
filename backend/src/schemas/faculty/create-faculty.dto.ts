import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  title: string;

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

  @IsString()
  @IsNotEmpty()
  joinedDate: string;

  @IsArray()
  // @IsNotEmpty()
  education: string[];

  @IsString()
  @IsNotEmpty()
  experience: string;

  @IsString()
 // @IsNotEmpty()
  image: string;
}
