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
import { DocumentsService } from './documents.service';
import { SectionPipe } from './section.pipe';
import {
  CreateDocumentDto,
  UpdateDocumentDto,
} from '../schemas/documents/create-document.dto';
import { pdfUploadOptions } from '../storage/storage.util';
import {
  DOCUMENT_SECTIONS,
  DocumentSection,
  documentFolder,
} from '../storage/storage.constants';

// The section is validated before multer runs (SectionPipe runs after interceptors),
// so the folder resolver re-checks it to avoid writing to an arbitrary directory.
const sectionFolder = (req: any) => {
  const section = req.params.section;
  if (!DOCUMENT_SECTIONS.includes(section)) {
    throw new BadRequestException(
      `Unknown section "${section}". Allowed: ${DOCUMENT_SECTIONS.join(', ')}`,
    );
  }
  return documentFolder(section);
};

/**
 * PDFs for the topbar sections: magazines, mentors-list, forms-download,
 * mandatory-disclosure, tpc-newsletter, safe-working, eoa.
 * Create / update take multipart form-data: `title` and the PDF in `file`.
 */
@Controller('documents')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Get('sections')
  sections() {
    return DOCUMENT_SECTIONS;
  }

  @Get(':section')
  findAll(@Param('section', SectionPipe) section: DocumentSection) {
    return this.documentsService.findAll(section);
  }

  @Get(':section/:id')
  findOne(
    @Param('section', SectionPipe) section: DocumentSection,
    @Param('id') id: string,
  ) {
    return this.documentsService.findOne(section, id);
  }

  @Post(':section')
  @UseInterceptors(FileInterceptor('file', pdfUploadOptions(sectionFolder)))
  create(
    @Param('section', SectionPipe) section: DocumentSection,
    @Body() dto: CreateDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('PDF file is required');
    return this.documentsService.create(section, dto, file);
  }

  @Put(':section/:id')
  @UseInterceptors(FileInterceptor('file', pdfUploadOptions(sectionFolder)))
  update(
    @Param('section', SectionPipe) section: DocumentSection,
    @Param('id') id: string,
    @Body() dto: UpdateDocumentDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.documentsService.update(section, id, dto, file);
  }

  @Delete(':section/:id')
  remove(
    @Param('section', SectionPipe) section: DocumentSection,
    @Param('id') id: string,
  ) {
    return this.documentsService.remove(section, id);
  }
}
