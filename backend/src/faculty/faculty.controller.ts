import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from '../schemas/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../schemas/faculty/update-faculty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from '../config/multer.config';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  async getAllFaculties() {
    return this.facultyService.findAll();
  }

  @Get(':id')
  async getFacultyById(@Param('id') id: string) {
    return this.facultyService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: multerConfig.storage, ...multerOptions }))
  async createFaculty(
    @Body() createFacultyDto: CreateFacultyDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const imageUrl = image ? `/uploads/${image.filename}` : null; // Local image path
    console.log(image)
    return this.facultyService.create({ ...createFacultyDto, image: imageUrl });
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.facultyService.update(id, updateFacultyDto, file);
  }
  @Delete(':id')
  async deleteFaculty(@Param('id') id: string) {
    return this.facultyService.delete(id);
  }
}
