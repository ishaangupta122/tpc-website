import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSuccessStoryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;

  /** Page-builder blocks as a JSON string (multipart form field). */
  @IsOptional()
  @IsString()
  blocks?: any;
}
