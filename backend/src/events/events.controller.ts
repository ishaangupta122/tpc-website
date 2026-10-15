import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from '../schemas/events/create-event.dto';
import { UpdateEventDto } from '../schemas/events/update-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions, toAbsoluteUrl, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

@Controller('events')
export class EventsController {
  private static multerOptions = imageUploadOptions(IMAGE_FOLDERS.events);

  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', EventsController.multerOptions))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    // The image is whatever was uploaded, never a path from the request body.
    createEventDto.image = file
      ? toAbsoluteUrl(toPublicPath(IMAGE_FOLDERS.events, file.filename))
      : undefined;
    return this.eventsService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', EventsController.multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    updateEventDto.image = file
      ? toAbsoluteUrl(toPublicPath(IMAGE_FOLDERS.events, file.filename))
      : undefined;
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
