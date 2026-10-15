import { BadRequestException, PipeTransform } from '@nestjs/common';
import { DOCUMENT_SECTIONS, DocumentSection } from '../storage/storage.constants';

export class SectionPipe implements PipeTransform<string, DocumentSection> {
  transform(value: string): DocumentSection {
    if (!DOCUMENT_SECTIONS.includes(value as DocumentSection)) {
      throw new BadRequestException(
        `Unknown section "${value}". Allowed: ${DOCUMENT_SECTIONS.join(', ')}`,
      );
    }
    return value as DocumentSection;
  }
}
