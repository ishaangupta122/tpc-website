import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from '../schemas/activities/create-activity.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/activity',
        filename: (req, file, callback) => {
          const filename: string =
            uuidv4() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    }),
  )
  async create(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }

    const imageUrl = `http://localhost:3000/uploads/activity/${file.filename}`;

    const activityData = { ...createActivityDto, imageUrl };
    return this.activityService.create(activityData);
  }

  @Get()
  async findAll(@Query('department') department: string) {
    if (department) {
      return this.activityService.findByDepartment(department);
    }
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/activity',
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
    @Body() updateActivityDto: CreateActivityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      const imageUrl = `http://localhost:3000/uploads/activity/${file.filename}`;
      updateActivityDto.imageUrl = imageUrl;
    }

    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }
}
