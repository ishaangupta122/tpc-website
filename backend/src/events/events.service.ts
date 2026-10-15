import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from '../schemas/events/event.schema';
import { CreateEventDto } from '../schemas/events/create-event.dto';
import { UpdateEventDto } from '../schemas/events/update-event.dto';
import { deleteUploadedFile } from '../storage/storage.util';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id).exec();
    if (!event) {
      throw new NotFoundException(`Event with ID "${id}" not found.`);
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const previous = await this.eventModel.findById(id).exec();
    if (!previous) {
      // The new upload (if any) has nowhere to live: don't keep it.
      deleteUploadedFile(updateEventDto.image);
      throw new NotFoundException(`Event with ID "${id}" not found.`);
    }
    const previousImage = previous.image;
    const updated = await this.eventModel
      .findByIdAndUpdate(id, updateEventDto, { new: true })
      .exec();
    // The old picture is only removed once the new one is saved.
    if (updateEventDto.image && previousImage !== updateEventDto.image) {
      deleteUploadedFile(previousImage);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.eventModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Event with ID "${id}" not found.`);
    }
    deleteUploadedFile(result.image);
  }
}
