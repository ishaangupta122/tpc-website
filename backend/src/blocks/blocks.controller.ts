import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  imageUploadOptions,
  toAbsoluteUrl,
  toPublicPath,
} from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

/** Image uploads for the page builder (achievements, events, success stories). */
@Controller('blocks')
export class BlocksController {
  @Post('image')
  @UseInterceptors(
    FileInterceptor('image', imageUploadOptions(IMAGE_FOLDERS.blocks)),
  )
  uploadImage(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('Image file is required');
    return {
      url: toAbsoluteUrl(toPublicPath(IMAGE_FOLDERS.blocks, file.filename)),
    };
  }
}
