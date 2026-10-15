import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacementsController } from './placements.controller';
import { PlacementsService } from './placements.service';
import { Placements, PlacementSchema } from '../schemas/placements/placements.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Placements.name, schema: PlacementSchema }]),
  ],
  controllers: [PlacementsController],
  providers: [PlacementsService],
})
export class PlacementsModule {}
