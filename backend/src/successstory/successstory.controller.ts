import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessStoryService } from './successstory.service';
import { CreateSuccessStoryDto } from '../schemas/successstory/create-successstory.dto';
import { UpdateSuccessStoryDto } from '../schemas/successstory/update-successstory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions, toAbsoluteUrl, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

@Controller('successstory')
export class SuccessStoryController {
  private static multerOptions = imageUploadOptions(IMAGE_FOLDERS.successStories);

  constructor(private readonly service: SuccessStoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', SuccessStoryController.multerOptions))
  async create(
    @Body() dto: CreateSuccessStoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    // The image is whatever was uploaded, never a path from the request body.
    dto.image = file
      ? toAbsoluteUrl(toPublicPath(IMAGE_FOLDERS.successStories, file.filename))
      : undefined;
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', SuccessStoryController.multerOptions))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSuccessStoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    // The image is whatever was uploaded, never a path from the request body.
    dto.image = file
      ? toAbsoluteUrl(toPublicPath(IMAGE_FOLDERS.successStories, file.filename))
      : undefined;
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
