import { BadRequestException } from '@nestjs/common';

/**
 * Page-builder blocks of an achievement's detail page. Only content and layout
 * orientation are stored; styling is fixed by the website's theme.
 */
const BLOCK_TYPES = [
  'heading',
  'text',
  'imagetext',
  'gallery',
  'html',
] as const;

const SIDE = ['left', 'right'];

const MAX_BLOCKS = 60;
const MAX_TEXT = 20000;
const MAX_HTML = 100000;
const MAX_GALLERY = 24;

export interface Block {
  type: (typeof BLOCK_TYPES)[number];
  text: string;
  html: string;
  image: string;
  images: string[];
  side: string;
  cols: number;
}

const str = (value: unknown, max: number) =>
  typeof value === 'string' ? value.slice(0, max) : '';
const pick = (value: unknown, allowed: string[]) =>
  allowed.includes(value as string) ? (value as string) : allowed[0];

/** Image paths are stored relative (`/uploads/...`), whatever host they were served from. */
const toRelative = (value: unknown, baseUrl: string) => {
  const s = str(value, 1000);
  return baseUrl && s.startsWith(baseUrl) ? s.slice(baseUrl.length) : s;
};

/** The single "image" block became a one-column gallery; old data is converted on the fly. */
const legacyImageToGallery = (item: any) =>
  item?.type === 'image'
    ? {
        ...item,
        type: 'gallery',
        cols: 1,
        images: item.image ? [item.image] : [],
        image: '',
      }
    : item;

/** A gallery caption only makes sense with photos. */
const dropOrphanCaption = (block: Block): Block =>
  block.type === 'gallery' && block.images.length === 0
    ? { ...block, text: '' }
    : block;

/** Blocks with nothing to show (no text, no photos, no HTML) are dropped. */
const hasContent = (block: Block) => {
  switch (block.type) {
    case 'heading':
    case 'text':
      return block.text !== '';
    case 'imagetext':
      return block.image !== '' || block.text !== '';
    case 'gallery':
      return block.images.length > 0;
    case 'html':
      return block.html !== '';
    default:
      return false;
  }
};

/** Parses the `blocks` form field (a JSON string) into a clean, whitelisted array. */
export const parseBlocks = (raw: unknown, baseUrl: string): Block[] => {
  let list: unknown = raw;
  if (typeof raw === 'string') {
    if (!raw.trim()) return [];
    try {
      list = JSON.parse(raw);
    } catch {
      throw new BadRequestException('Blocks must be valid JSON');
    }
  }
  if (!Array.isArray(list))
    throw new BadRequestException('Blocks must be a list');
  if (list.length > MAX_BLOCKS)
    throw new BadRequestException(
      `An achievement can have at most ${MAX_BLOCKS} blocks`,
    );

  // Block types that no longer exist (removed from the builder) are dropped.
  return list
    .map(legacyImageToGallery)
    .filter((item: any) => item && BLOCK_TYPES.includes(item.type))
    .map((item: any) => ({
      type: item.type,
      text: str(item.text, MAX_TEXT),
      html: str(item.html, MAX_HTML),
      image: toRelative(item.image, baseUrl),
      images: (Array.isArray(item.images) ? item.images : [])
        .slice(0, MAX_GALLERY)
        .map((image: unknown) => toRelative(image, baseUrl)),
      side: pick(item.side, SIDE),
      cols: [1, 2, 3, 4].includes(Number(item.cols)) ? Number(item.cols) : 3,
    }))
    .map(dropOrphanCaption)
    .filter(hasContent);
};

const toAbsolute = (value: string, baseUrl: string) =>
  value && value.startsWith('/uploads/') ? `${baseUrl}${value}` : value;

/** Same blocks with image paths turned into absolute URLs for the clients. */
export const withAbsoluteUrls = (
  blocks: Block[] = [],
  baseUrl: string,
): Block[] =>
  blocks.map(legacyImageToGallery).map((block) => ({
    ...block,
    image: toAbsolute(block.image, baseUrl),
    images: (block.images || []).map((image) => toAbsolute(image, baseUrl)),
  }));

/** Public base URL of this API (BASE_URL), without a trailing slash. */
export const apiBaseUrl = () =>
  (
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`
  ).replace(/\/$/, '');

/** A stored document with its page-builder blocks ready for the clients. */
export const withBlocksUrls = <T extends Record<string, any>>(doc: T) => ({
  ...doc,
  blocks: withAbsoluteUrls(doc.blocks, apiBaseUrl()),
});
