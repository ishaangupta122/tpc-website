import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuccessStoryService } from './successstory.service';
import { SuccessStoryController } from './successstory.controller';
import { SuccessStory, SuccessStorySchema } from '../schemas/successstory/successstory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SuccessStory.name, schema: SuccessStorySchema }])],
  controllers: [SuccessStoryController],
  providers: [SuccessStoryService],
})
export class SuccessStoryModule {}
