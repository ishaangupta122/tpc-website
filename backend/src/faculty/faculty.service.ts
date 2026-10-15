import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Faculty } from '../schemas/faculty/faculty.schema';
import { CreateFacultyDto } from '../schemas/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../schemas/faculty/update-faculty.dto';
import { deleteUploadedFile, toPublicPath } from '../storage/storage.util';
import { IMAGE_FOLDERS } from '../storage/storage.constants';

/** Whole years completed since `joinedDate` (null when the date is missing/invalid). */
export const yearsSince = (joinedDate?: string, now = new Date()): number | null => {
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
  private readonly baseUrl: string;

  constructor(
    @InjectModel(Faculty.name) private readonly facultyModel: Model<Faculty>,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL');
  }

  /** Adds the absolute image URL and the auto-calculated experience. */
  private serialize(faculty: any) {
    return {
      ...faculty,
      image: faculty.image ? `${this.baseUrl}${faculty.image}` : null,
      experience: yearsSince(faculty.joinedDate),
    };
  }

  // Get all faculties
  async findAll(): Promise<any[]> {
    const faculties = await this.facultyModel.find().lean().exec();
    return faculties.map((faculty) => this.serialize(faculty));
  }

  // Get a single faculty by ID
  async findById(id: string): Promise<any> {
    const faculty = await this.facultyModel.findById(id).lean().exec();
    if (!faculty) {
      throw new NotFoundException('Faculty not found');
    }
    return this.serialize(faculty);
  }

  // Create a new faculty with file handling
  async create(createFacultyDto: CreateFacultyDto, file?: Express.Multer.File): Promise<any> {
    if (file) {
      createFacultyDto.image = toPublicPath(IMAGE_FOLDERS.faculty, file.filename); // Store relative path
    }

    const newFaculty = new this.facultyModel(createFacultyDto);
    const savedFaculty = await newFaculty.save();

    return this.serialize(savedFaculty.toObject());
  }

  // Update a faculty with file handling
  async update(id: string, updateFacultyDto: UpdateFacultyDto, file?: Express.Multer.File): Promise<any> {
    const existingFaculty = await this.facultyModel.findById(id).exec();

    if (!existingFaculty) {
      throw new NotFoundException('Faculty not found');
    }

    if (file) {
      // Delete existing image if it exists
      if (existingFaculty.image) {
        deleteUploadedFile(existingFaculty.image);
      }
      updateFacultyDto.image = toPublicPath(IMAGE_FOLDERS.faculty, file.filename);
    }

    Object.assign(existingFaculty, updateFacultyDto);
    const updatedFaculty = await existingFaculty.save();

    return this.serialize(updatedFaculty.toObject());
  }

  // Delete a faculty and associated image
  async delete(id: string): Promise<any> {
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
