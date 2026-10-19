import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SuccessStory } from '../schemas/successstory/successstory.schema';
import { CreateSuccessStoryDto } from '../schemas/successstory/create-successstory.dto';
import { UpdateSuccessStoryDto } from '../schemas/successstory/update-successstory.dto';
import { deleteUploadedFile, withFileUrls } from '../storage/storage.util';
import { apiBaseUrl, parseBlocks, withBlocksUrls } from '../utils/blocks.util';

const withStoryUrls = (story: Record<string, any>) =>
  withFileUrls(withBlocksUrls(story), 'image');

@Injectable()
export class SuccessStoryService {
  constructor(
    @InjectModel(SuccessStory.name) private model: Model<SuccessStory>,
  ) {}

  async create(dto: CreateSuccessStoryDto) {
    if ('blocks' in dto) dto.blocks = parseBlocks(dto.blocks, apiBaseUrl());
    const newStory = new this.model(dto);
    return withStoryUrls((await newStory.save()).toObject());
  }

  async findAll() {
    const stories = await this.model.find().sort({ _id: -1 }).lean().exec();
    return stories.map((story) => withStoryUrls(story));
  }

  async findOne(id: string) {
    const story = await this.model.findById(id).lean().exec();
    if (!story) throw new NotFoundException('Success story not found');
    return withStoryUrls(story);
  }

  async update(id: string, dto: UpdateSuccessStoryDto) {
    const previous = await this.model.findById(id).exec();
    if (!previous) {
      deleteUploadedFile(dto.image); // the new upload has nowhere to live
      throw new NotFoundException('Success story not found');
    }
    const previousImage = previous.image;
    if ('blocks' in dto) dto.blocks = parseBlocks(dto.blocks, apiBaseUrl());
    const updatedStory = await this.model
      .findByIdAndUpdate(id, dto, { new: true })
      .lean()
      .exec();
    // The old picture is only removed once the new one is saved.
    if (dto.image && previousImage !== dto.image)
      deleteUploadedFile(previousImage);
    return withStoryUrls(updatedStory);
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.model.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Success story not found');
    deleteUploadedFile(deleted.image);
  }
}
