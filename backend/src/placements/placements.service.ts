import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlacementDto } from '../schemas/placements/create-placements.dto';
import { UpdateDepartmentDto } from '../schemas/placements/update-placements.dto';
import { PlacementDocument, Placements } from '../schemas/placements/placements.schema';

@Injectable()
export class PlacementsService {
  constructor(
    @InjectModel(Placements.name) private placementModel: Model<PlacementDocument>,
  ) {}

  async create(createPlacementDto: CreatePlacementDto): Promise<Placements> {
    const { year, departments } = createPlacementDto;

    const existingPlacement = await this.placementModel.findOne({ year });

    if (existingPlacement) {
        // Merge new departments with existing ones, avoiding duplicates
        departments.forEach((newDept) => {
            const existingDeptIndex = existingPlacement.departments.findIndex(
                (dept) => dept.department === newDept.department
            );

            if (existingDeptIndex !== -1) {
                // Update existing department details
                existingPlacement.departments[existingDeptIndex] = {
                    ...existingPlacement.departments[existingDeptIndex],
                    ...newDept,
                };
            } else {
                // Add new department
                existingPlacement.departments.push(newDept);
            }
        });

        return existingPlacement.save();
    } else {
        // Create new entry if year does not exist
        const newPlacement = new this.placementModel(createPlacementDto);
        return newPlacement.save();
    }
}

  
  // Find all Placements
  async findAll(): Promise<Placements[]> {
    return this.placementModel.find().exec();
  }

  // Find one Placement
  async findOne(id: string): Promise<Placements> {
    return this.placementModel.findById(id).exec();
  }

  // Update Placement
  async update(id: string, updatePlacementDto: CreatePlacementDto): Promise<Placements> {
    return this.placementModel.findByIdAndUpdate(id, updatePlacementDto, { new: true }).exec();
  }

  // Remove Placement
  async remove(id: string): Promise<void> {
    await this.placementModel.findByIdAndDelete(id).exec();
  }

  // Add a department to a placement
  async addDepartment(id: string, department: UpdateDepartmentDto): Promise<Placements> {
    return this.placementModel.findByIdAndUpdate(
      id,
      { $push: { departments: department } },
      { new: true },
    ).exec();
  }

  // Update a department within a placement
  async updateDepartment(id: string, departmentId: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Placements> {
    return this.placementModel.findOneAndUpdate(
      { _id: id, 'departments._id': departmentId },
      { $set: { 'departments.$': updateDepartmentDto } },
      { new: true },
    ).exec();
  }

  // Remove a department from a placement
  async removeDepartment(id: string, departmentId: string): Promise<Placements> {
    return this.placementModel.findByIdAndUpdate(
      id,
      { $pull: { departments: { _id: departmentId } } },
      { new: true },
    ).exec();
  }
}
