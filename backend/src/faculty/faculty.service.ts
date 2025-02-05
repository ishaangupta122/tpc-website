import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Faculty } from '../schemas/faculty/faculty.schema';
import { CreateFacultyDto } from '../schemas/faculty/create-faculty.dto';
import { UpdateFacultyDto } from '../schemas/faculty/update-faculty.dto';
import { unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FacultyService {
  private readonly baseUrl: string;

  constructor(
    @InjectModel(Faculty.name) private readonly facultyModel: Model<Faculty>,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL');
  }

  // Get all faculties
  async findAll(): Promise<any[]> {
    const faculties = await this.facultyModel.find().lean().exec();
    return faculties.map(faculty => ({
      ...faculty,
      image: faculty.image ? `${this.baseUrl}${faculty.image}` : null,
    }));
  }

  // Get a single faculty by ID
  async findById(id: string): Promise<any> {
    const faculty = await this.facultyModel.findById(id).lean().exec();
    if (!faculty) {
      throw new NotFoundException('Faculty not found');
    }
    return {
      ...faculty,
      image: faculty.image ? `${this.baseUrl}${faculty.image}` : null,
    };
  }

  // Create a new faculty
  async create(createFacultyDto: CreateFacultyDto): Promise<any> {
    const newFaculty = new this.facultyModel(createFacultyDto);
    const savedFaculty = await newFaculty.save();

    return {
      ...savedFaculty.toObject(),
      image: savedFaculty.image ? `${this.baseUrl}${savedFaculty.image}` : null,
    };
  }

  // Update a faculty
  async update(id: string, updateFacultyDto: UpdateFacultyDto, file?: Express.Multer.File): Promise<any> {
    const existingFaculty = await this.facultyModel.findById(id).exec();

    if (!existingFaculty) {
      throw new NotFoundException('Faculty not found');
    }

    // Handle image replacement
    if (file) {
      if (existingFaculty.image) {
        this.deleteImageFile(existingFaculty.image);
      }
      updateFacultyDto.image = file.filename;
    }

    Object.assign(existingFaculty, updateFacultyDto); // Merge updates
    const updatedFaculty = await existingFaculty.save();

    return {
      ...updatedFaculty.toObject(),
      image: updatedFaculty.image ? `${this.baseUrl}${updatedFaculty.image}` : null,
    };
  }

  // Delete a faculty
  async delete(id: string): Promise<any> {
    const deletedFaculty = await this.facultyModel.findByIdAndDelete(id).exec();

    if (!deletedFaculty) {
      throw new NotFoundException('Faculty not found');
    }

    // Delete associated image if it exists
    if (deletedFaculty.image) {
      this.deleteImageFile(deletedFaculty.image);
    }

    return {
      ...deletedFaculty.toObject(),
      image: deletedFaculty.image ? `${this.baseUrl}${deletedFaculty.image}` : null,
    };
  }

  // Helper to delete the image file
  private deleteImageFile(imagePath: string): void {
    try {
      const fullPath = join(__dirname, '../../..', imagePath);
      unlinkSync(fullPath);
    } catch (err) {
      console.error('Error deleting image file:', err.message);
    }
  }
}
