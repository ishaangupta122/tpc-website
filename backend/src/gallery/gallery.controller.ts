import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from '../schemas/gallery/create-gallery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.gallery)),
  )
  async create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const imageUrl = toPublicPath(IMAGE_FOLDERS.gallery, file.filename);

    const galleryData = { ...createGalleryDto, imageUrl };
    return this.galleryService.create(galleryData);
  }

  @Get()
  async findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.gallery)),
  )
  async update(
    @Param('id') id: string,
    @Body() updateGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // The image is whatever was uploaded, never a path from the request body.
    updateGalleryDto.imageUrl = file
      ? toPublicPath(IMAGE_FOLDERS.gallery, file.filename)
      : undefined;

    return this.galleryService.update(id, updateGalleryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
