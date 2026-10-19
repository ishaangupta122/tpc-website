import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync, unlink } from 'fs';
import { diskStorage } from 'multer';
import { extname, join, normalize, sep } from 'path';
import { randomUUID } from 'crypto';
import {
  MAX_IMAGE_SIZE,
  MAX_PDF_SIZE,
  getUploadRoot,
} from './storage.constants';

type FolderResolver = string | ((req: any) => string);

/** Disk storage that saves into `uploads/<folder>` (created on demand) with a uuid name. */
const createDiskStorage = (folder: FolderResolver) =>
  diskStorage({
    destination: (req, _file, cb) => {
      try {
        const dir = join(
          getUploadRoot(),
          typeof folder === 'function' ? folder(req) : folder,
        );
        mkdirSync(dir, { recursive: true });
        cb(null, dir);
      } catch (err) {
        cb(err as Error, '');
      }
    },
    filename: (_req, file, cb) =>
      cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`),
  });

const IMAGE_MIMES = ['image/jpeg', 'image/jpg', 'image/png'];

const imageFilter = (_req, file, cb) =>
  IMAGE_MIMES.includes(file.mimetype)
    ? cb(null, true)
    : cb(
        new BadRequestException('Only jpg, jpeg and png images are allowed'),
        false,
      );

const pdfFilter = (_req, file, cb) =>
  file.mimetype === 'application/pdf' &&
  extname(file.originalname).toLowerCase() === '.pdf'
    ? cb(null, true)
    : cb(new BadRequestException('Only PDF files are allowed'), false);

/** Multer options for image uploads into `uploads/<folder>`. */
export const imageUploadOptions = (folder: FolderResolver) => ({
  storage: createDiskStorage(folder),
  fileFilter: imageFilter,
  limits: { fileSize: MAX_IMAGE_SIZE },
});

/** Multer options for PDF uploads into `uploads/<folder>`. */
export const pdfUploadOptions = (folder: FolderResolver) => ({
  storage: createDiskStorage(folder),
  fileFilter: pdfFilter,
  limits: { fileSize: MAX_PDF_SIZE },
});

/** Public path (stored in the DB) of a file saved via the helpers above. */
export const toPublicPath = (folder: string, filename: string) =>
  `/uploads/${folder}/${filename}`;

/** Turns a stored `/uploads/...` path into an absolute URL using BASE_URL. */
export const toAbsoluteUrl = (publicPath?: string | null) => {
  if (!publicPath) return null;
  if (/^https?:\/\//i.test(publicPath)) return publicPath;
  const base =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  return `${base.replace(/\/$/, '')}${publicPath}`;
};

/**
 * A record with the absolute URL of its stored file(s) in the given field(s).
 * Files are stored as `/uploads/...` paths; older records may hold full URLs,
 * which are returned as they are.
 */
export const withFileUrls = <T extends Record<string, any>>(
  doc: T,
  ...fields: string[]
) => ({
  ...doc,
  ...Object.fromEntries(
    fields.map((field) => [field, toAbsoluteUrl(doc[field])]),
  ),
});

/** Best-effort removal of a stored file; never throws and never leaves `uploads/`. */
export const deleteUploadedFile = (publicPath?: string | null) => {
  if (!publicPath) return;
  // Accept both `/uploads/x` and `http://host/uploads/x`.
  const idx = publicPath.indexOf('/uploads/');
  if (idx === -1) return;
  const relative = normalize(publicPath.slice(idx + '/uploads/'.length));
  const root = getUploadRoot();
  const full = join(root, relative);
  if (!full.startsWith(root + sep) || !existsSync(full)) return;
  unlink(full, (err) => {
    if (err) console.error('Error deleting file:', err.message);
  });
};
