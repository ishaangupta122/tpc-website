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
  BadRequestException,
} from '@nestjs/common';
import { SuccessStoryService } from './successstory.service';
import { CreateSuccessStoryDto } from '../schemas/successstory/create-successstory.dto';
import { UpdateSuccessStoryDto } from '../schemas/successstory/update-successstory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('successstory')
export class SuccessStoryController {
  private static multerOptions = {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return callback(new BadRequestException('Only image files are allowed!'), false);
      }
      callback(null, true);
    },
  };

  constructor(private readonly service: SuccessStoryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', SuccessStoryController.multerOptions))
  async create(
    @Body() dto: CreateSuccessStoryDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file) {
      dto.image = `${process.env.BASE_URL}/uploads/${file.filename}`;
    }
    console.log('DATA:', dto);
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
    if (file) {
      dto.image = `${process.env.BASE_URL}/uploads/${file.filename}`;
    }
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
