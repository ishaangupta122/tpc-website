import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoticeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  // Multipart bodies send booleans as the strings "true" / "false".
  @IsOptional()
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  highlight?: boolean;
}

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {}
