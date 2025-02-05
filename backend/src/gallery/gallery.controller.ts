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
  import { diskStorage } from 'multer';
  import { v4 as uuidv4 } from 'uuid';
  import * as path from 'path';
  
  @Controller('gallery')
  export class GalleryController {
    constructor(private readonly galleryService: GalleryService) {}
  
    @Post()
    @UseInterceptors(
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/gallery',
          filename: (req, file, callback) => {
            const filename: string =
              uuidv4() + path.extname(file.originalname);
            callback(null, filename);
          },
        }),
      }),
    )
    async create(
      @Body() createGalleryDto: CreateGalleryDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (!file) {
        throw new BadRequestException('Image file is required');
      }
  
      const imageUrl = `http://localhost:3000/gallery/uploads/${file.filename}`;
  
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
      FileInterceptor('image', {
        storage: diskStorage({
          destination: './uploads/gallery',
          filename: (req, file, callback) => {
            const filename: string =
              uuidv4() + path.extname(file.originalname);
            callback(null, filename);
          },
        }),
      }),
    )
    async update(
      @Param('id') id: string,
      @Body() updateGalleryDto: CreateGalleryDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      if (file) {
        const imageUrl = `http://localhost:3000/gallery/uploads/${file.filename}`;
        updateGalleryDto.imageUrl = imageUrl;
      }
  
      return this.galleryService.update(id, updateGalleryDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.galleryService.remove(id);
    }
  }
  