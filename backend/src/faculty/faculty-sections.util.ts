import { BadRequestException } from '@nestjs/common';

/**
 * Extra sections of a faculty profile, shown as tables on the website.
 * Each section is a list of rows; only the listed keys are stored.
 */
const FACULTY_SECTIONS = {
  publications: ['title', 'journal', 'year', 'link'],
  conferences: ['title', 'conference', 'venue', 'year'],
  books: ['title', 'publisher', 'year', 'isbn'],
} as const;

type FacultySection = keyof typeof FACULTY_SECTIONS;

const MAX_ROWS = 200;
const MAX_TEXT = 500;

/** Parses a section sent as a JSON string (multipart form field) into clean rows. */
const parseSectionRows = (section: FacultySection, raw: unknown) => {
  let list: unknown = raw;
  if (typeof raw === 'string') {
    if (!raw.trim()) return [];
    try {
      list = JSON.parse(raw);
    } catch {
      throw new BadRequestException(`${section} must be valid JSON`);
    }
  }
  if (!Array.isArray(list))
    throw new BadRequestException(`${section} must be a list`);
  if (list.length > MAX_ROWS)
    throw new BadRequestException(
      `At most ${MAX_ROWS} rows are allowed in ${section}`,
    );

  return list
    .map((item: any) =>
      Object.fromEntries(
        FACULTY_SECTIONS[section].map((key) => [
          key,
          typeof item?.[key] === 'string'
            ? item[key].trim().slice(0, MAX_TEXT)
            : '',
        ]),
      ),
    )
    .filter((row) => row.title); // a row needs at least a title
};

/** Replaces the section fields of a request body by their parsed rows. */
export const applySections = (dto: Record<string, any>) => {
  for (const section of Object.keys(FACULTY_SECTIONS) as FacultySection[]) {
    if (section in dto) dto[section] = parseSectionRows(section, dto[section]);
  }
};
