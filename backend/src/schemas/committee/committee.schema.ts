import { Schema, Document } from 'mongoose';

export const CommitteeSchema = new Schema({
  info: { type: String, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true },
});

export interface Committee extends Document {
  info: string;
  name: string;
  designation: string;
}
