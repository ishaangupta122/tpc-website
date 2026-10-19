import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from '../schemas/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../schemas/faculty/update-faculty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

@Controller('faculty')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  async findAll() {
    return this.facultyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.facultyService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.faculty)),
  )
  async create(
    @Body() createDto: CreateFacultyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.facultyService.create(createDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.faculty)),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateFacultyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.facultyService.update(id, updateDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.facultyService.remove(id);
  }
}
