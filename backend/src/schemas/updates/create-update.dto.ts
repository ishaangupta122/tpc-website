import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  tag: string;

  // @IsString()
  // tagColor: string;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  image: string;
  
}
