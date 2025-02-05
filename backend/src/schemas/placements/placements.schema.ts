import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type PlacementDocument = Placements & Document;

@Schema()
export class PlacementsDetails {
  @Prop({ required: true, index: true })
  department: string;

  @Prop({ required: true })
  approvedIntake: number;

  @Prop({ required: true })
  companiesVisited: number;

  @Prop({ required: true })
  studentsPlaced: number;

  @Prop({ required: true })
  avgPackage: string;
}

const PlacementDetailsSchema = SchemaFactory.createForClass(PlacementsDetails);

@Schema()
export class Placements {
  @Prop({ required: true })
  year: string;

  @Prop({ type: [PlacementDetailsSchema], required: true })
  departments: PlacementsDetails[];
}

export const PlacementSchema = SchemaFactory.createForClass(Placements);
