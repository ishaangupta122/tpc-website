import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAchievementDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
