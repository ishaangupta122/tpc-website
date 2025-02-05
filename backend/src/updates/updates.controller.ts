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
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UpdatesService } from './updates.service';
import { CreateUpdateDto } from '../schemas/updates/create-update.dto';
import { UpdateUpdateDto } from '../schemas/updates/update-update.dto';

@Controller('updates')
export class UpdatesController {
  constructor(private readonly updatesService: UpdatesService) {}

  @Get()
  async getAllUpdates() {
    return this.updatesService.findAll();
  }

  @Get(':id')
  async getUpdateById(@Param('id') id: string) {
    return this.updatesService.findOne(id);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/updates', // Directory for uploaded images
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async createUpdate(
    @Body() createUpdateDto: CreateUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.updatesService.create(createUpdateDto, file);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/updates',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async updateUpdate(
    @Param('id') id: string,
    @Body() updateUpdateDto: UpdateUpdateDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.updatesService.update(id, updateUpdateDto, file);
  }

  @Delete(':id')
  async deleteUpdate(@Param('id') id: string) {
    return this.updatesService.delete(id);
  }
}
