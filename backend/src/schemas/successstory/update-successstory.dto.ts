import { PartialType } from '@nestjs/mapped-types';
import { CreateSuccessStoryDto } from './create-successstory.dto';

export class UpdateSuccessStoryDto extends PartialType(CreateSuccessStoryDto) {}
