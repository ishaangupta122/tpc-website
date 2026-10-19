import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '../schemas/gallery/gallery.schema';
import { CreateGalleryDto } from '../schemas/gallery/create-gallery.dto';
import { deleteUploadedFile, withFileUrls } from '../storage/storage.util';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<Gallery>,
  ) {}

  async create(createGalleryDto: CreateGalleryDto) {
    const createdGallery = new this.galleryModel(createGalleryDto);
    return withFileUrls((await createdGallery.save()).toObject(), 'imageUrl');
  }

  async findAll() {
    const images = await this.galleryModel
      .find()
      .sort({ _id: -1 })
      .lean()
      .exec();
    return images.map((image) => withFileUrls(image, 'imageUrl'));
  }

  async findOne(id: string) {
    const image = await this.galleryModel.findById(id).lean().exec();
    if (!image) throw new NotFoundException('Gallery image not found');
    return withFileUrls(image, 'imageUrl');
  }

  async update(id: string, updateGalleryDto: CreateGalleryDto) {
    const previous = await this.galleryModel.findById(id).exec();
    if (!previous) {
      deleteUploadedFile(updateGalleryDto.imageUrl); // the new upload has nowhere to live
      throw new NotFoundException('Gallery image not found');
    }
    const previousImage = previous.imageUrl;
    const updated = await this.galleryModel
      .findByIdAndUpdate(id, updateGalleryDto, { new: true })
      .lean()
      .exec();
    // The old picture is only removed once the new one is saved.
    if (
      updateGalleryDto.imageUrl &&
      previousImage !== updateGalleryDto.imageUrl
    ) {
      deleteUploadedFile(previousImage);
    }
    return withFileUrls(updated, 'imageUrl');
  }

  async remove(id: string) {
    const removed = await this.galleryModel.findByIdAndDelete(id).exec();
    if (!removed) throw new NotFoundException('Gallery image not found');
    deleteUploadedFile(removed.imageUrl);
    return withFileUrls(removed.toObject(), 'imageUrl');
  }
}
