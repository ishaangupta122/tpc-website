import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DepartmentsService } from './departments.service';
import {
  pdfUploadOptions,
  toAbsoluteUrl,
  toPublicPath,
} from '../storage/storage.util';
import { DEPARTMENT_DOCS_FOLDER } from '../storage/storage.constants';
import {
  DEPARTMENT_KEYS,
  DepartmentKey,
} from '../schemas/departments/department.schema';

/**
 * Department pages. Reading is public; changes need an admin token (global
 * guard). A department only stores its "other pages" (HTML pages, PDFs and
 * links); the description is part of the website and the head of department
 * comes from the Faculty list.
 */
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly service: DepartmentsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  /** Uploads one PDF for a department item and returns its URL. */
  @Post('pdf')
  @UseInterceptors(
    FileInterceptor('file', pdfUploadOptions(DEPARTMENT_DOCS_FOLDER)),
  )
  uploadPdf(@UploadedFile() file?: Express.Multer.File) {
    if (!file) throw new BadRequestException('PDF file is required');
    return {
      url: toAbsoluteUrl(toPublicPath(DEPARTMENT_DOCS_FOLDER, file.filename)),
      name: file.originalname,
    };
  }

  @Put(':key')
  save(@Param('key') key: string, @Body() body: Record<string, any>) {
    if (!DEPARTMENT_KEYS.includes(key as DepartmentKey))
      throw new BadRequestException(`Unknown department "${key}"`);
    return this.service.save(key as DepartmentKey, body);
  }
}
