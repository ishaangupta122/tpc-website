import { IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  description: string;

  @IsString()
  department: string;

  @IsString()
  imageUrl: string;
}
