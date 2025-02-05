// src/committee/committee.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommitteeController } from './committee.controller';
import { CommitteeService } from './committee.service';
import { CommitteeSchema } from '../schemas/committee/committee.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Committee', schema: CommitteeSchema }]),
  ],
  controllers: [CommitteeController],
  providers: [CommitteeService],
})
export class CommitteeModule {}
