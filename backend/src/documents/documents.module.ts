import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import {
  SectionDocument,
  SectionDocumentSchema,
} from '../schemas/documents/document.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SectionDocument.name, schema: SectionDocumentSchema },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
