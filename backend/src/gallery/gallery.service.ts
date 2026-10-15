import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '../schemas/gallery/gallery.schema';
import { CreateGalleryDto } from '../schemas/gallery/create-gallery.dto';
import { deleteUploadedFile } from '../storage/storage.util';

@Injectable()
export class GalleryService {
  constructor(@InjectModel(Gallery.name) private galleryModel: Model<Gallery>) {}

  async create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const createdGallery = new this.galleryModel(createGalleryDto);
    return createdGallery.save();
  }

  async findAll(): Promise<Gallery[]> {
    return this.galleryModel.find().exec();
  }

  async findOne(id: string): Promise<Gallery> {
    const image = await this.galleryModel.findById(id).exec();
    if (!image) throw new NotFoundException('Gallery image not found');
    return image;
  }

  async update(id: string, updateGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const previous = await this.galleryModel.findById(id).exec();
    if (!previous) {
      deleteUploadedFile(updateGalleryDto.imageUrl); // the new upload has nowhere to live
      throw new NotFoundException('Gallery image not found');
    }
    const previousImage = previous.imageUrl;
    const updated = await this.galleryModel
      .findByIdAndUpdate(id, updateGalleryDto, { new: true })
      .exec();
    // The old picture is only removed once the new one is saved.
    if (updateGalleryDto.imageUrl && previousImage !== updateGalleryDto.imageUrl) {
      deleteUploadedFile(previousImage);
    }
    return updated;
  }

  async remove(id: string): Promise<Gallery> {
    const removed = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('Gallery image not found');
    deleteUploadedFile(removed.imageUrl);
    return removed;
  }
}
