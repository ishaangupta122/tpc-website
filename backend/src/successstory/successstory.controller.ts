import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuccessStoryService } from './successstory.service';
import { CreateSuccessStoryDto } from '../schemas/successstory/create-successstory.dto';
import { UpdateSuccessStoryDto } from '../schemas/successstory/update-successstory.dto';

@Controller('successstory')
export class SuccessStoryController {
  constructor(private readonly service: SuccessStoryService) {}

  @Post()
  create(@Body() dto: CreateSuccessStoryDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateSuccessStoryDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
