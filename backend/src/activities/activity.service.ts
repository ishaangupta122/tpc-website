import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from '../schemas/activities/activity.schema';
import { CreateActivityDto } from '../schemas/activities/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(@InjectModel(Activity.name) private activityModel: Model<Activity>) {}

  async create(createActivityDto: CreateActivityDto): Promise<Activity> {
    const createdActivity = new this.activityModel(createActivityDto);
    return createdActivity.save();
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.find().exec();
  }

  async findByDepartment(department: string): Promise<Activity[]> {
    return this.activityModel.find({ department }).exec();
  }

  async findOne(id: string): Promise<Activity> {
    return this.activityModel.findById(id).exec();
  }

  async update(id: string, updateActivityDto: CreateActivityDto): Promise<Activity> {
    return this.activityModel.findByIdAndUpdate(id, updateActivityDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.activityModel.findByIdAndDelete({_id: id}).exec();
  }
}
