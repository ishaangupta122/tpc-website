import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/events/event.schema';
import { CreateEventDto } from '../schemas/events/create-event.dto';
import { UpdateEventDto } from '../schemas/events/update-event.dto';
import { deleteUploadedFile, withFileUrls } from '../storage/storage.util';
import { apiBaseUrl, parseBlocks, withBlocksUrls } from '../utils/blocks.util';
import { toDisplayDate, toIsoDate } from '../utils/date.util';

// Blocks with absolute image URLs, a category, plus `dateIso` for the admin (sorting, date picker).
const withEventUrls = (event: Record<string, any>) => ({
  ...withFileUrls(withBlocksUrls(event), 'image'),
  // Events saved before categories existed belong to the whole college.
  category: event.category || 'College',
  dateIso: toIsoDate(event.date),
});

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto) {
    createEventDto.date = toDisplayDate(createEventDto.date);
    if ('blocks' in createEventDto)
      createEventDto.blocks = parseBlocks(createEventDto.blocks, apiBaseUrl());
    const newEvent = new this.eventModel(createEventDto);
    return withEventUrls((await newEvent.save()).toObject());
  }

  async findAll() {
    const events = await this.eventModel.find().sort({ _id: -1 }).lean().exec();
    return events.map((event) => withEventUrls(event));
  }

  async findOne(id: string) {
    const event = await this.eventModel.findById(id).lean().exec();
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return withEventUrls(event);
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const previous = await this.eventModel.findById(id).exec();
    if (!previous) {
      // The new upload (if any) has nowhere to live: don't keep it.
      deleteUploadedFile(updateEventDto.image);
      throw new NotFoundException('Event not found');
    }
    const previousImage = previous.image;
    if ('date' in updateEventDto)
      updateEventDto.date = toDisplayDate(updateEventDto.date);
    if ('blocks' in updateEventDto)
      updateEventDto.blocks = parseBlocks(updateEventDto.blocks, apiBaseUrl());
    const updated = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .lean()
      .exec();
    // The old picture is only removed once the new one is saved.
    if (updateEventDto.image && previousImage !== updateEventDto.image) {
      deleteUploadedFile(previousImage);
    }
    return withEventUrls(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Event not found');
    }
    deleteUploadedFile(result.image);
  }
}
