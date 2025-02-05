import { IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  description: string;

  @IsString()
  imageUrl: string;
}
