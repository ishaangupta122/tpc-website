import {
  Body,
  Controller,
  Get,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrincipalService } from './principal.service';
import { imageUploadOptions } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

/**
 * "Message from the Principal" page. Reading is public; saving needs an admin
 * token (global guard). Save takes multipart form-data: `name`, `message`,
 * `highlights` (JSON string) and an optional photo in `image`.
 */
@Controller('principal')
export class PrincipalController {
  constructor(private readonly service: PrincipalService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Put()
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.principal)),
  )
  save(
    @Body() body: Record<string, any>,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.service.save(body, file);
  }
}
