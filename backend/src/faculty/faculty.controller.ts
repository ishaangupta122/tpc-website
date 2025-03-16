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
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.facultyService.create(createFacultyDto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image', { storage: multerConfig.storage, ...multerOptions }))
  async updateFaculty(
    @Param('id') id: string,
    @Body() updateFacultyDto: UpdateFacultyDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log("data: ",updateFacultyDto, file)
    return this.facultyService.update(id, updateFacultyDto, file);
  }

  @Delete(':id')
  async deleteFaculty(@Param('id') id: string) {
    return this.facultyService.delete(id);
  }
}
