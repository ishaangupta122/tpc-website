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

  /** Position in the list (lowest first); set by dragging in the admin. */
  @Prop()
  order?: number;

  /** Blinks with a yellow highlight on the home page when true. */
  @Prop({ default: false })
  highlight: boolean;
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
