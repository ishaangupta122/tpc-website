import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Notice extends Document {
  @Prop({ required: true, trim: true })
  title: string;

  /** Relative path of the PDF, e.g. `/uploads/documents/notices/<uuid>.pdf`. */
  @Prop({ required: true })
  file: string;

  @Prop()
  originalName?: string;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
