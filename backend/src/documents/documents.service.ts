import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!doc) throw new NotFoundException(`Document "${id}" not found in "${section}"`);
    return doc;
  }

  async findAll(section: DocumentSection) {
    const docs = await this.documentModel
      .find({ section })
      .sort({ createdAt: -1 })
      .exec();
    return docs.map((d) => this.serialize(d));
  }

  async findOne(section: DocumentSection, id: string) {
    return this.serialize(await this.getOrFail(section, id));
  }

  async create(
    section: DocumentSection,
    dto: CreateDocumentDto,
    file: Express.Multer.File,
  ) {
    const doc = await this.documentModel.create({
      ...dto,
      section,
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
