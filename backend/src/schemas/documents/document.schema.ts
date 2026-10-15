import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongoDocument } from 'mongoose';
import { DOCUMENT_SECTIONS } from '../../storage/storage.constants';

@Schema({ timestamps: true })
export class SectionDocument extends MongoDocument {
  @Prop({ required: true, enum: DOCUMENT_SECTIONS, index: true })
  section: string;

  @Prop({ required: true, trim: true })
  title: string;

  /** Relative path of the PDF, e.g. `/uploads/documents/magazines/<uuid>.pdf`. */
  @Prop({ required: true })
  file: string;

  @Prop()
  originalName?: string;
}

export const SectionDocumentSchema =
  SchemaFactory.createForClass(SectionDocument);
