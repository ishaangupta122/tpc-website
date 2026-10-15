import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { deleteUploadedFile, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';
import { Achievement } from '../schemas/achievements/achievements.schema';

@Injectable()
export class AchievementsService {
  private readonly baseUrl: string;

  constructor(
    @InjectModel(Achievement.name) private readonly achievementsModel: Model<Achievement>,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL');
  }

  async findAll(): Promise<Record<string, any>[]> {
    const achievements = await this.achievementsModel.find().lean().exec();
    return achievements.map((achievement) => ({
      ...achievement,
      image: achievement.image ? `${this.baseUrl}${achievement.image}` : null,
    }));
  }

  async findOne(id: string): Promise<Record<string, any>> {
    const achievement = await this.achievementsModel.findById(id).lean().exec();
    if (!achievement) {
      throw new NotFoundException('Achievement not found');
    }
    return {
      ...achievement,
      image: achievement.image ? `${this.baseUrl}${achievement.image}` : null,
    };
  }

  async create(createAchievementDto: any, file?: Express.Multer.File) {
    if (file) {
      createAchievementDto.image = toPublicPath(IMAGE_FOLDERS.achievements, file.filename);
    }
    const createdAchievement = new this.achievementsModel(createAchievementDto);
    const savedAchievement = await createdAchievement.save();

    return {
      ...savedAchievement.toObject(),
      image: savedAchievement.image ? `${this.baseUrl}${savedAchievement.image}` : null,
    };
  }

  async update(id: string, updateAchievementDto: any, file?: Express.Multer.File) {
    const existingAchievement = await this.achievementsModel.findById(id).exec();

    if (!existingAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    if (file) {
      if (existingAchievement.image) {
        deleteUploadedFile(existingAchievement.image);
      }
      updateAchievementDto.image = toPublicPath(IMAGE_FOLDERS.achievements, file.filename);
    }

    Object.assign(existingAchievement, updateAchievementDto);
    const updatedAchievement = await existingAchievement.save();

    return {
      ...updatedAchievement.toObject(),
      image: updatedAchievement.image
        ? `${this.baseUrl}${updatedAchievement.image}`
        : null,
    };
  }

  async delete(id: string) {
    const deletedAchievement = await this.achievementsModel.findByIdAndDelete(id).exec();

    if (!deletedAchievement) {
      throw new NotFoundException('Achievement not found');
    }

    if (deletedAchievement.image) {
      deleteUploadedFile(deletedAchievement.image);
    }

    return {
      ...deletedAchievement.toObject(),
      image: deletedAchievement.image
        ? `${this.baseUrl}${deletedAchievement.image}`
        : null,
    };
  }
}
