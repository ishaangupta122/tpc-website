import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faculty } from '../schemas/faculty/faculty.schema';
import { CreateFacultyDto } from '../schemas/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../schemas/faculty/update-faculty.dto';
import {
  deleteUploadedFile,
  toPublicPath,
  withFileUrls,
} from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';
import { applySections } from './faculty-sections.util';
import { toDisplayDate, toIsoDate } from '../utils/date.util';

/** Stored (and shown) when a faculty member has no phone number. */
const NO_PHONE = 'N/A';

/** Whole years completed since `joinedDate` (null when the date is missing/invalid). */
const yearsSince = (joinedDate?: string, now = new Date()): number | null => {
  const joined = new Date(joinedDate);
  if (!joinedDate || isNaN(joined.getTime()) || joined > now) return null;
  let years = now.getFullYear() - joined.getFullYear();
  const anniversaryPassed =
    now.getMonth() > joined.getMonth() ||
    (now.getMonth() === joined.getMonth() && now.getDate() >= joined.getDate());
  if (!anniversaryPassed) years--;
  return Math.max(years, 0);
};

@Injectable()
export class FacultyService {
  constructor(
    @InjectModel(Faculty.name) private readonly facultyModel: Model<Faculty>,
  ) {}

  /** Adds the absolute image URL and the auto-calculated experience. */
  private serialize(faculty: any) {
    return {
      ...withFileUrls(faculty, 'image'),
      // Stored as "15 Oct 2026"; the ISO form is for the admin's date picker.
      joinedDateIso: toIsoDate(faculty.joinedDate),
      experience: yearsSince(
        toIsoDate(faculty.joinedDate) || faculty.joinedDate,
      ),
    };
  }

  // Get all faculties
  async findAll(): Promise<any[]> {
    const faculties = await this.facultyModel
      .find()
      .sort({ _id: -1 })
      .lean()
      .exec();
    return faculties.map((faculty) => this.serialize(faculty));
  }

  // Get a single faculty by ID
  async findOne(id: string): Promise<any> {
    const faculty = await this.facultyModel.findById(id).lean().exec();
    if (!faculty) {
      throw new NotFoundException('Faculty not found');
    }
    return this.serialize(faculty);
  }

  // Create a new faculty with file handling
  async create(
    createFacultyDto: CreateFacultyDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    if (file) {
      createFacultyDto.image = toPublicPath(
        IMAGE_FOLDERS.faculty,
        file.filename,
      ); // Store relative path
    }

    applySections(createFacultyDto);
    createFacultyDto.phone = createFacultyDto.phone?.trim() || NO_PHONE;
    createFacultyDto.joinedDate = toDisplayDate(
      toIsoDate(createFacultyDto.joinedDate) || createFacultyDto.joinedDate,
    );
    const newFaculty = new this.facultyModel(createFacultyDto);
    const savedFaculty = await newFaculty.save();

    return this.serialize(savedFaculty.toObject());
  }

  // Update a faculty with file handling
  async update(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
    file?: Express.Multer.File,
  ): Promise<any> {
    const existingFaculty = await this.facultyModel.findById(id).exec();

    if (!existingFaculty) {
      throw new NotFoundException('Faculty not found');
    }

    if (file) {
      // Delete existing image if it exists
      if (existingFaculty.image) {
        deleteUploadedFile(existingFaculty.image);
      }
      updateFacultyDto.image = toPublicPath(
        IMAGE_FOLDERS.faculty,
        file.filename,
      );
    }

    applySections(updateFacultyDto);
    if ('joinedDate' in updateFacultyDto)
      updateFacultyDto.joinedDate = toDisplayDate(
        toIsoDate(updateFacultyDto.joinedDate) || updateFacultyDto.joinedDate,
      );
    if ('phone' in updateFacultyDto)
      updateFacultyDto.phone = updateFacultyDto.phone?.trim() || NO_PHONE;
    Object.assign(existingFaculty, updateFacultyDto);
    const updatedFaculty = await existingFaculty.save();

    return this.serialize(updatedFaculty.toObject());
  }

  // Delete a faculty and associated image
  async remove(id: string): Promise<any> {
    const deletedFaculty = await this.facultyModel.findByIdAndDelete(id).exec();

    if (!deletedFaculty) {
      throw new NotFoundException('Faculty not found');
    }

    if (deletedFaculty.image) {
      deleteUploadedFile(deletedFaculty.image);
    }

    return this.serialize(deletedFaculty.toObject());
  }
}
