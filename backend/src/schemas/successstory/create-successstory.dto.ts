import { IsString, IsNotEmpty } from 'class-validator';

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
}
