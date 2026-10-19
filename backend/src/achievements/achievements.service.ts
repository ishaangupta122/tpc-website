import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  deleteUploadedFile,
  toPublicPath,
  withFileUrls,
} from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';
import { apiBaseUrl, parseBlocks, withBlocksUrls } from '../utils/blocks.util';
import { toDisplayDate, toIsoDate } from '../utils/date.util';
import { Achievement } from '../schemas/achievements/achievements.schema';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectModel(Achievement.name)
    private readonly achievementsModel: Model<Achievement>,
  ) {}

  private serialize(achievement: Record<string, any>): Record<string, any> {
    return {
      ...withFileUrls(withBlocksUrls(achievement), 'image'),
      // `dateIso` lets the admin sort and pre-fill its date picker.
      dateIso: toIsoDate(achievement.date),
    };
  }

  async findAll(): Promise<Record<string, any>[]> {
    const achievements = await this.achievementsModel
      .find()
      .sort({ _id: -1 })
      .lean()
      .exec();
    return achievements.map((achievement) => this.serialize(achievement));
  }

  async findOne(id: string): Promise<Record<string, any>> {
    const achievement = await this.achievementsModel.findById(id).lean().exec();
    if (!achievement) {
      throw new NotFoundException('Achievement not found');
    }
    return this.serialize(achievement);
  }

  async create(createAchievementDto: any, file?: Express.Multer.File) {
    if (file) {
      createAchievementDto.image = toPublicPath(
        IMAGE_FOLDERS.achievements,
        file.filename,
      );
    }
    createAchievementDto.date = toDisplayDate(createAchievementDto.date);
    if ('blocks' in createAchievementDto)
      createAchievementDto.blocks = parseBlocks(
        createAchievementDto.blocks,
        apiBaseUrl(),
      );
    const createdAchievement = new this.achievementsModel(createAchievementDto);
    const savedAchievement = await createdAchievement.save();

    return this.serialize(savedAchievement.toObject());
  }

  async update(
    id: string,
    updateAchievementDto: any,
    file?: Express.Multer.File,
  ) {
    const existingAchievement = await this.achievementsModel
      .findById(id)
      .exec();

    if (!existingAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    if (file) {
      if (existingAchievement.image) {
        deleteUploadedFile(existingAchievement.image);
      }
      updateAchievementDto.image = toPublicPath(
        IMAGE_FOLDERS.achievements,
        file.filename,
      );
    }

    if ('date' in updateAchievementDto)
      updateAchievementDto.date = toDisplayDate(updateAchievementDto.date);
    if ('blocks' in updateAchievementDto)
      updateAchievementDto.blocks = parseBlocks(
        updateAchievementDto.blocks,
        apiBaseUrl(),
      );
    Object.assign(existingAchievement, updateAchievementDto);
    const updatedAchievement = await existingAchievement.save();

    return this.serialize(updatedAchievement.toObject());
  }

  async remove(id: string) {
    const deletedAchievement = await this.achievementsModel
      .findByIdAndDelete(id)
      .exec();

    if (!deletedAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    if (deletedAchievement.image) {
      deleteUploadedFile(deletedAchievement.image);
    }

    return this.serialize(deletedAchievement.toObject());
  }
}
