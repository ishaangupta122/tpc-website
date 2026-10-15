import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notice } from '../schemas/notices/notice.schema';
import {
  CreateNoticeDto,
  UpdateNoticeDto,
} from '../schemas/notices/create-notice.dto';
import {
  deleteUploadedFile,
  toAbsoluteUrl,
  toPublicPath,
} from '../storage/storage.util';
import { NOTICES_FOLDER } from '../storage/storage.constants';

@Injectable()
export class NoticesService {
  constructor(@InjectModel(Notice.name) private noticeModel: Model<Notice>) {}

  private serialize(notice: Notice) {
    const { file, ...rest } = notice.toObject();
    return { ...rest, fileUrl: toAbsoluteUrl(file) };
  }

  async findAll() {
    const notices = await this.noticeModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
    return notices.map((n) => this.serialize(n));
  }

  async findOne(id: string) {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) throw new NotFoundException(`Notice "${id}" not found`);
    return this.serialize(notice);
  }

  async create(dto: CreateNoticeDto, file: Express.Multer.File) {
    const notice = await this.noticeModel.create({
      ...dto,
      file: toPublicPath(NOTICES_FOLDER, file.filename),
      originalName: file.originalname,
    });
    return this.serialize(notice);
  }

  async update(id: string, dto: UpdateNoticeDto, file?: Express.Multer.File) {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) throw new NotFoundException(`Notice "${id}" not found`);

    const previousFile = notice.file;
    Object.assign(notice, dto);
    if (file) {
      notice.file = toPublicPath(NOTICES_FOLDER, file.filename);
      notice.originalName = file.originalname;
    }
    await notice.save();
    if (file) deleteUploadedFile(previousFile);
    return this.serialize(notice);
  }

  async remove(id: string) {
    const notice = await this.noticeModel.findByIdAndDelete(id).exec();
    if (!notice) throw new NotFoundException(`Notice "${id}" not found`);
    deleteUploadedFile(notice.file);
    return { message: 'Notice deleted' };
  }
}
