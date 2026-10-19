import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from '../schemas/achievements/create-achievement.dto';
import { UpdateAchievementDto } from '../schemas/achievements/update-achievement.dto';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async findAll(): Promise<Record<string, any>[]> {
    return this.achievementsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Record<string, any>> {
    return this.achievementsService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.achievements)),
  )
  async create(
    @Body() createDto: CreateAchievementDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.achievementsService.create(createDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.achievements)),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAchievementDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.achievementsService.update(id, updateDto, file);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.achievementsService.remove(id);
  }
}
