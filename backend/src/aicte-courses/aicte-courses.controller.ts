import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AicteCoursesService } from './aicte-courses.service';
import {
  CreateAicteCourseDto,
  UpdateAicteCourseDto,
} from '../schemas/aicte-courses/aicte-course.dto';

/** AICTE approved courses and intake. Reading is public; changes need an admin token. */
@Controller('aicte-courses')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AicteCoursesController {
  constructor(private readonly service: AicteCoursesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() dto: CreateAicteCourseDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAicteCourseDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
