import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Department,
  DepartmentKey,
  DepartmentResource,
} from '../schemas/departments/department.schema';
import { toAbsoluteUrl } from '../storage/storage.util';
import { DEPARTMENT_DOCS_FOLDER } from '../storage/storage.constants';

const MAX_PAGES = 30;
const TYPES = ['page', 'pdf', 'link'];
const PDF_PREFIX = `/uploads/${DEPARTMENT_DOCS_FOLDER}/`;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'page';

/** A stored PDF path, whether the admin sent it relative or as a full URL. */
const toRelativePdf = (value: unknown) => {
  const raw = text(value, 1000);
  const at = raw.indexOf(PDF_PREFIX);
  return at >= 0 ? raw.slice(at) : '';
};

/** Cleans the list of other pages (HTML pages, PDFs and links), with unique slugs. */
const parsePages = (raw: unknown): DepartmentResource[] => {
  let list: unknown = raw;
  if (typeof raw === 'string') {
    if (!raw.trim()) return [];
    try {
      list = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Pages must be valid JSON');
    }
  }
  if (!Array.isArray(list))
    throw new BadRequestException('Pages must be a list');
  if (list.length > MAX_PAGES)
    throw new BadRequestException(
      `A department can have at most ${MAX_PAGES} extra pages`,
    );

  const used = new Set<string>();
  return list.map((item: any) => {
    const title = text(item?.title, 200);
    if (!title) throw new BadRequestException('Every item needs a title');
    const type = TYPES.includes(item?.type) ? item.type : 'page';

    const html = type === 'page' ? text(item?.html, 100000) : '';
    const file = type === 'pdf' ? toRelativePdf(item?.file) : '';
    const url = type === 'link' ? text(item?.url, 1000) : '';
    if (type === 'page' && !html)
      throw new BadRequestException(`"${title}" needs its content`);
    if (type === 'pdf' && !file)
      throw new BadRequestException(`"${title}" needs a PDF file`);
    if (type === 'link' && !/^https?:\/\//i.test(url))
      throw new BadRequestException(
        `"${title}" needs a link starting with http:// or https://`,
      );

    // Keep the existing address of an item; new ones get one from their title.
    const wanted = /^[a-z0-9-]{1,60}$/.test(item?.slug ?? '')
      ? item.slug
      : slugify(title);
    let slug = wanted;
    for (let n = 2; used.has(slug); n++) slug = `${wanted}-${n}`;
    used.add(slug);
    return { title, slug, type, html, file, url };
  });
};

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectModel(Department.name) private readonly model: Model<Department>,
  ) {}

  private serialize(doc: any) {
    return {
      key: doc.key,
      pages: (doc.pages || []).map((page: any) => ({
        title: page.title,
        slug: page.slug,
        type: page.type || 'page',
        html: page.html || '',
        fileUrl: page.file ? toAbsoluteUrl(page.file) : null,
        url: page.url || '',
      })),
    };
  }

  /** Every department the admin has saved something for. */
  async findAll() {
    const docs = await this.model.find().lean().exec();
    return docs.map((doc) => this.serialize(doc));
  }

  /** Saves the extra pages of one department (created on first save). */
  async save(key: DepartmentKey, body: Record<string, any>) {
    const pages = parsePages(body?.pages);
    const saved = await this.model
      .findOneAndUpdate(
        { key },
        { $set: { pages }, $setOnInsert: { key } },
        { new: true, upsert: true },
      )
      .lean()
      .exec();
    return this.serialize(saved);
  }
}
