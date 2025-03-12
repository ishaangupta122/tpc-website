import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { Update } from '../schemas/updates/updates.schema';

@Injectable()
export class UpdatesService {
  private readonly baseUrl: string;

  constructor(
    @InjectModel(Update.name) private readonly updatesModel: Model<Update>,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL');
  }

  async findAll() {
    const updates = await this.updatesModel.find().lean().exec();
    return updates.map((update) => ({
      ...update,
      image: update.image ? `${this.baseUrl}${update.image}` : null,
    }));
  }

  async findOne(id: string) {
    const update = await this.updatesModel.findById(id).lean().exec();
    if (!update) {
      throw new NotFoundException('Update not found');
    }
    return {
      ...update,
      image: update.image ? `${this.baseUrl}${update.image}` : null,
    };
  }

  async create(createUpdateDto: any, file?: Express.Multer.File) {
    if (file) {
      createUpdateDto.image = `/uploads/updates/${file.filename}`;
    }
    const createdUpdate = new this.updatesModel(createUpdateDto);
    const savedUpdate = await createdUpdate.save();

    return {
      ...savedUpdate.toObject(),
      image: savedUpdate.image ? `${this.baseUrl}/${savedUpdate.image}` : null,
    };
  }

  async update(id: string, updateUpdateDto: any, file?: Express.Multer.File) {
    const existingUpdate = await this.updatesModel.findById(id).exec();

    if (!existingUpdate) {
      throw new NotFoundException('Update not found');
    }

    if (file) {
      if (existingUpdate.image) {
        this.deleteImageFile(existingUpdate.image);
      }
      updateUpdateDto.image = `/uploads/updates/${file.filename}`;
    }

    Object.assign(existingUpdate, updateUpdateDto);
    const updatedUpdate = await existingUpdate.save();

    return {
      ...updatedUpdate.toObject(),
      image: updatedUpdate.image
        ? `${this.baseUrl}${updatedUpdate.image}`
        : null,
    };
  }

  async delete(id: string) {
    const deletedUpdate = await this.updatesModel.findByIdAndDelete(id).exec();

    if (!deletedUpdate) {
      throw new NotFoundException('Update not found');
    }

    if (deletedUpdate.image) {
      this.deleteImageFile(deletedUpdate.image);
    }

    return {
      ...deletedUpdate.toObject(),
      image: deletedUpdate.image
        ? `${this.baseUrl}${deletedUpdate.image}`
        : null,
    };
  }

  private deleteImageFile(imagePath: string): void {
    try {
      const fullPath = join(__dirname, '../../..', imagePath);
      unlinkSync(fullPath);
    } catch (err) {
      console.error('Error deleting image file:', err.message);
    }
  }
}
