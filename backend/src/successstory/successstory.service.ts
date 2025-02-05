import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessStory } from '../schemas/successstory/successstory.schema';
import { CreateSuccessStoryDto } from '../schemas/successstory/create-successstory.dto';
import { UpdateSuccessStoryDto } from '../schemas/successstory/update-successstory.dto';

@Injectable()
export class SuccessStoryService {
  constructor(@InjectModel(SuccessStory.name) private model: Model<SuccessStory>) {}

  async create(dto: CreateSuccessStoryDto): Promise<SuccessStory> {
    const newStory = new this.model(dto);
    return newStory.save();
  }

  async findAll(): Promise<SuccessStory[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<SuccessStory> {
    const story = await this.model.findById(id).exec();
    if (!story) throw new NotFoundException('Success Story not found');
    return story;
  }

  async update(id: string, dto: UpdateSuccessStoryDto): Promise<SuccessStory> {
    const updatedStory = await this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updatedStory) throw new NotFoundException('Success Story not found');
    return updatedStory;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Success Story not found');
  }
}
