import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdatesController } from './updates.controller';
import { UpdatesService } from './updates.service';
import { Update, UpdatesSchema } from '../schemas/updates/updates.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Update.name, schema: UpdatesSchema }]),
  ],
  controllers: [UpdatesController],
  providers: [UpdatesService],
})
export class UpdatesModule {}
