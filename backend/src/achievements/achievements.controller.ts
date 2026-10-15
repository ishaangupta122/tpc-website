import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  UploadedFile, 
  UseInterceptors 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions, toAbsoluteUrl, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from '../schemas/achievements/create-achievement.dto';
import { UpdateAchievementDto } from '../schemas/achievements/update-achievement.dto';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Get()
  async getAllAchievements(): Promise<Record<string, any>[]> {
    return this.achievementsService.findAll();
  }

  @Get(':id')
  async getAchievementById(@Param('id') id: string): Promise<Record<string, any>> {
    return this.achievementsService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.achievements)),
  )
  async createAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.achievementsService.create(createAchievementDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.achievements)),
  )
  async updateAchievement(
    @Param('id') id: string,
    @Body() updateAchievementDto: UpdateAchievementDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.achievementsService.update(id, updateAchievementDto, file);
  }

  @Delete(':id')
  async deleteAchievement(@Param('id') id: string) {
    return this.achievementsService.delete(id);
  }
}
