import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NoticesService } from './notices.service';
import {
  CreateNoticeDto,
  UpdateNoticeDto,
} from '../schemas/notices/create-notice.dto';
import { pdfUploadOptions } from '../storage/storage.util';
import { NOTICES_FOLDER } from '../storage/storage.constants';

/**
 * Notices & Circulars shown on the home page.
 * Create / update take multipart form-data: `title`, PDF in `file`.
 */
@Controller('notices')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  findAll() {
    return this.noticesService.findAll();
  }

  /** Saves the order the admin dragged the notices into: { ids: [...] }. */
  @Put('reorder')
  reorder(@Body() body: { ids: string[] }) {
    return this.noticesService.reorder(body?.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticesService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', pdfUploadOptions(NOTICES_FOLDER)))
  create(
    @Body() dto: CreateNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('PDF file is required');
    return this.noticesService.create(dto, file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', pdfUploadOptions(NOTICES_FOLDER)))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateNoticeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.noticesService.update(id, dto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticesService.remove(id);
  }
}
