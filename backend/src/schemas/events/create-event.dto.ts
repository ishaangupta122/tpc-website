import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
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
}
