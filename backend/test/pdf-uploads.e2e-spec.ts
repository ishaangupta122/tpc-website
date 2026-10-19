import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { existsSync, mkdtempSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { NoticesController } from '../src/notices/notices.controller';
import { NoticesService } from '../src/notices/notices.service';
import { DocumentsController } from '../src/documents/documents.controller';
import { DocumentsService } from '../src/documents/documents.service';
import { Notice } from '../src/schemas/notices/notice.schema';
import { SectionDocument } from '../src/schemas/documents/document.schema';

const fakeModel = () => {
  const rows: any[] = [];
  const wrap = (r: any) => ({
    ...r,
    toObject: () => ({ ...r }),
    save: async () => r,
    deleteOne: async () => rows.splice(rows.indexOf(r), 1),
  });
  return {
    create: async (d: any) => {
      const r = { _id: String(rows.length + 1), ...d };
      rows.push(r);
      return wrap(r);
    },
    find: (q: any = {}) => ({
      sort: () => ({
        exec: async () =>
          rows.filter((r) => !q.section || r.section === q.section).map(wrap),
      }),
    }),
    // `findOne(...).sort(...)` is how the services look up the first position.
    findOne: () => ({
      sort: () => ({ exec: async () => null }),
      exec: async () => null,
    }),
  };
};

describe('PDF uploads', () => {
  let app: INestApplication;
  // Uploads go to a throwaway folder so the real `uploads/` is never touched.
  const uploadRoot = mkdtempSync(join(tmpdir(), 'tpc-uploads-'));
  const pdf = Buffer.from('%PDF-1.4 test');

  beforeAll(async () => {
    process.env.BASE_URL = 'http://host';
    process.env.UPLOAD_ROOT = uploadRoot;
    const mod = await Test.createTestingModule({
      controllers: [NoticesController, DocumentsController],
      providers: [
        NoticesService,
        DocumentsService,
        { provide: getModelToken(Notice.name), useValue: fakeModel() },
        { provide: getModelToken(SectionDocument.name), useValue: fakeModel() },
      ],
    }).compile();
    app = mod.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
    delete process.env.UPLOAD_ROOT;
    rmSync(uploadRoot, { recursive: true, force: true });
  });

  it('creates a notice with a pdf', async () => {
    const res = await request(app.getHttpServer())
      .post('/notices')
      .field('title', 'Admission Notice')
      .attach('file', pdf, {
        filename: 'a.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);
    expect(res.body.fileUrl).toMatch(
      /^http:\/\/host\/uploads\/documents\/notices\/.+\.pdf$/,
    );
    expect(
      existsSync(
        join(uploadRoot, res.body.fileUrl.replace('http://host/uploads/', '')),
      ),
    ).toBe(true);
    const list = await request(app.getHttpServer()).get('/notices').expect(200);
    expect(list.body).toHaveLength(1);
  });
  it('rejects non-pdf and missing file/title', async () => {
    await request(app.getHttpServer())
      .post('/notices')
      .field('title', 'x')
      .attach('file', Buffer.from('hi'), {
        filename: 'a.txt',
        contentType: 'text/plain',
      })
      .expect(400);
    await request(app.getHttpServer())
      .post('/notices')
      .field('title', 'x')
      .expect(400);
    await request(app.getHttpServer())
      .post('/notices')
      .attach('file', pdf, {
        filename: 'a.pdf',
        contentType: 'application/pdf',
      })
      .expect(400);
  });
  it('stores section pdfs per section and rejects unknown sections', async () => {
    const res = await request(app.getHttpServer())
      .post('/documents/magazines')
      .field('title', 'Mag 2025')
      .attach('file', pdf, {
        filename: 'm.pdf',
        contentType: 'application/pdf',
      })
      .expect(201);
    expect(res.body.fileUrl).toContain('/uploads/documents/magazines/');
    expect(
      (
        await request(app.getHttpServer())
          .get('/documents/magazines')
          .expect(200)
      ).body,
    ).toHaveLength(1);
    expect(
      (
        await request(app.getHttpServer())
          .get('/documents/forms-download')
          .expect(200)
      ).body,
    ).toHaveLength(0);
    await request(app.getHttpServer())
      .post('/documents/..%2Fx')
      .field('title', 'x')
      .attach('file', pdf, {
        filename: 'm.pdf',
        contentType: 'application/pdf',
      })
      .expect(400);
    await request(app.getHttpServer()).get('/documents/bogus').expect(400);
  });
});
