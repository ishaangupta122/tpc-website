import { join, resolve } from 'path';

/**
 * Absolute path of the folder that is served at `/uploads`.
 * Read on every call so tests can point it at a temp folder via UPLOAD_ROOT.
 */
export const getUploadRoot = () =>
  process.env.UPLOAD_ROOT
    ? resolve(process.env.UPLOAD_ROOT)
    : join(process.cwd(), 'uploads');

/**
 * Layout of the uploads folder:
 *
 *   uploads/
 *   ├── images/<feature>/...      (events, faculty, gallery, ...)
 *   └── documents/<section>/...   (notices, magazines, forms-download, ...)
 */
export const IMAGE_FOLDERS = {
  events: 'images/events',
  faculty: 'images/faculty',
  gallery: 'images/gallery',
  successStories: 'images/success-stories',
  achievements: 'images/achievements',
} as const;

export const NOTICES_FOLDER = 'documents/notices';

/** Sections of the site (topbar links) that each hold their own PDFs. */
export const DOCUMENT_SECTIONS = [
  'magazines',
  'mentors-list',
  'forms-download',
  'mandatory-disclosure',
  'tpc-newsletter',
  'safe-working',
  'eoa',
] as const;

export type DocumentSection = (typeof DOCUMENT_SECTIONS)[number];

export const documentFolder = (section: DocumentSection) =>
  `documents/${section}`;

export const MAX_PDF_SIZE = 20 * 1024 * 1024; // 20 MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 MB
