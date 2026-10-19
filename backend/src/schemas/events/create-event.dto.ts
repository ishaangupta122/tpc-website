import { IsOptional, IsString } from 'class-validator';

export class CreateEventDto {
  @IsOptional()
  @IsString()
  category?: string;

  // @IsNotEmpty()
  @IsString()
  date: string;

  //@IsNotEmpty()
  @IsString()
  title: string;

  //@IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  @IsString()
  image?: string;

  /** Page-builder blocks as a JSON string (multipart form field). */
  @IsOptional()
  @IsString()
  blocks?: any;
}
