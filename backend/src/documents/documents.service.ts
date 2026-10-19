import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SectionDocument } from '../schemas/documents/document.schema';
import {
  CreateDocumentDto,
  UpdateDocumentDto,
} from '../schemas/documents/create-document.dto';
import {
  deleteUploadedFile,
  toAbsoluteUrl,
  toPublicPath,
} from '../storage/storage.util';
import { DocumentSection, documentFolder } from '../storage/storage.constants';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(SectionDocument.name)
    private documentModel: Model<SectionDocument>,
  ) {}

  private serialize(doc: SectionDocument) {
    const { file, ...rest } = doc.toObject();
    return { ...rest, fileUrl: toAbsoluteUrl(file) };
  }

  private async getOrFail(section: DocumentSection, id: string) {
    const doc = await this.documentModel.findOne({ _id: id, section }).exec();
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  /**
   * One section's documents in the order the admin arranged them. Documents
   * never arranged keep the old order (newest first) and rank by their place in it.
   */
  async findAll(section: DocumentSection) {
    const docs = await this.documentModel
      .find({ section })
      .sort({ createdAt: -1 })
      .exec();
    return docs
      .map((doc, index) => ({ doc, rank: doc.order ?? index }))
      .sort((a, b) => a.rank - b.rank)
      .map(({ doc }) => this.serialize(doc));
  }

  /** Saves a new order for ONE section: `ids` is that section's documents, first to last. */
  async reorder(section: DocumentSection, ids: string[]) {
    if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string'))
      throw new BadRequestException('ids must be a list of document ids');
    await this.documentModel.bulkWrite(
      ids.map((id, index) => ({
        // The section is part of the filter, so other sections are never touched.
        updateOne: {
          filter: { _id: id, section },
          update: { $set: { order: index } },
        },
      })),
    );
    return this.findAll(section);
  }

  async findOne(section: DocumentSection, id: string) {
    return this.serialize(await this.getOrFail(section, id));
  }

  async create(
    section: DocumentSection,
    dto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    // A new document goes to the top of its section.
    const first = await this.documentModel
      .findOne({ section, order: { $ne: null } })
      .sort({ order: 1 })
      .exec();
    const doc = await this.documentModel.create({
      ...dto,
      section,
      order: first?.order !== undefined ? first.order - 1 : undefined,
      file: toPublicPath(documentFolder(section), file.filename),
      originalName: file.originalname,
    });
    return this.serialize(doc);
  }

  async update(
    section: DocumentSection,
    id: string,
    dto: UpdateDocumentDto,
    file?: Express.Multer.File,
  ) {
    const doc = await this.getOrFail(section, id);
    const previousFile = doc.file;
    Object.assign(doc, dto);
    if (file) {
      doc.file = toPublicPath(documentFolder(section), file.filename);
      doc.originalName = file.originalname;
    }
    await doc.save();
    if (file) deleteUploadedFile(previousFile);
    return this.serialize(doc);
  }

  async remove(section: DocumentSection, id: string) {
    const doc = await this.getOrFail(section, id);
    await doc.deleteOne();
    deleteUploadedFile(doc.file);
    return { message: 'Document deleted' };
  }
}
