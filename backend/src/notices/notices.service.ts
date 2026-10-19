import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  /**
   * In the order the admin arranged them. Notices that were never arranged
   * keep the old order (newest first) and rank by their place in it.
   */
  async findAll() {
    const notices = await this.noticeModel
      .find()
      .sort({ createdAt: -1 })
      .exec();
    return notices
      .map((notice, index) => ({ notice, rank: notice.order ?? index }))
      .sort((a, b) => a.rank - b.rank)
      .map(({ notice }) => this.serialize(notice));
  }

  /** Saves a new order: `ids` is every notice id, first to last. */
  async reorder(ids: string[]) {
    if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string'))
      throw new BadRequestException('ids must be a list of notice ids');
    await this.noticeModel.bulkWrite(
      ids.map((id, index) => ({
        updateOne: { filter: { _id: id }, update: { $set: { order: index } } },
      })),
    );
    return this.findAll();
  }

  async findOne(id: string) {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) throw new NotFoundException('Notice not found');
    return this.serialize(notice);
  }

  async create(dto: CreateNoticeDto, file: Express.Multer.File) {
    // A new notice goes to the top of the list.
    const first = await this.noticeModel
      .findOne({ order: { $ne: null } })
      .sort({ order: 1 })
      .exec();
    const notice = await this.noticeModel.create({
      ...dto,
      order: first?.order !== undefined ? first.order - 1 : undefined,
      file: toPublicPath(NOTICES_FOLDER, file.filename),
      originalName: file.originalname,
    });
    return this.serialize(notice);
  }

  async update(id: string, dto: UpdateNoticeDto, file?: Express.Multer.File) {
    const notice = await this.noticeModel.findById(id).exec();
    if (!notice) throw new NotFoundException('Notice not found');

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
    if (!notice) throw new NotFoundException('Notice not found');
    deleteUploadedFile(notice.file);
    return { message: 'Notice deleted' };
  }
}
