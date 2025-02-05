import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Gallery } from '../schemas/gallery/gallery.schema';
import { CreateGalleryDto } from '../schemas/gallery/create-gallery.dto';

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
    return this.galleryModel.findById(id).exec();
  }

  async update(id: string, updateGalleryDto: CreateGalleryDto): Promise<Gallery> {
    return this.galleryModel.findByIdAndUpdate(id, updateGalleryDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.galleryModel.findOneAndDelete({_id: id}).exec();
  }
}
