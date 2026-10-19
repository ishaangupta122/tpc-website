import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Principal } from '../schemas/principal/principal.schema';
import {
  deleteUploadedFile,
  toAbsoluteUrl,
  toPublicPath,
} from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

const MAX_HIGHLIGHTS = 12;
const MAX_POINTS = 12;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Parses the `highlights` form field (JSON string) into clean cards. */
const parseHighlights = (raw: unknown) => {
  let list: unknown = raw;
  if (typeof raw === 'string') {
    if (!raw.trim()) return [];
    try {
      list = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Highlights must be valid JSON');
    }
  }
  if (!Array.isArray(list))
    throw new BadRequestException('Highlights must be a list');
  return list
    .slice(0, MAX_HIGHLIGHTS)
    .map((item: any) => ({
      title: text(item?.title, 200),
      points: (Array.isArray(item?.points) ? item.points : [])
        .slice(0, MAX_POINTS)
        .map((point: unknown) => text(point, 400))
        .filter(Boolean),
    }))
    .filter((card) => card.title);
};

@Injectable()
export class PrincipalService {
  constructor(
    @InjectModel(Principal.name) private readonly model: Model<Principal>,
  ) {}

  private serialize(doc: any) {
    return { ...doc, image: doc.image ? toAbsoluteUrl(doc.image) : null };
  }

  /** The principal page content, or an empty object when nothing was saved yet. */
  async get() {
    const doc = await this.model.findOne().lean().exec();
    return doc ? this.serialize(doc) : {};
  }

  async save(body: Record<string, any>, file?: Express.Multer.File) {
    const existing = await this.model.findOne().exec();
    const update: Record<string, any> = {};
    if ('name' in body) update.name = text(body.name, 200);
    if ('message' in body) update.message = text(body.message, 20000);
    if ('highlights' in body)
      update.highlights = parseHighlights(body.highlights);
    if (file)
      update.image = toPublicPath(IMAGE_FOLDERS.principal, file.filename);

    const previousImage = existing?.image;
    const saved = await this.model
      .findOneAndUpdate({}, update, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      })
      .lean()
      .exec();
    if (file && previousImage) deleteUploadedFile(previousImage);
    return this.serialize(saved);
  }
}
