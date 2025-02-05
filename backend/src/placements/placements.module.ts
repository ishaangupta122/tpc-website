import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlacementsController } from './placements.controller';
import { PlacementsService } from './placements.service';
import { Placements, PlacementSchema } from '../schemas/placements/placements.schema';
import { AuthGuard } from '../guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Placements.name, schema: PlacementSchema }]),
    JwtModule.register({
          secret: process.env.JWT_SECRET || '',
          signOptions: { expiresIn: '1h' }, 
        }),
  ],
  controllers: [PlacementsController],
  providers: [PlacementsService, AuthGuard],
})
export class PlacementsModule {}
