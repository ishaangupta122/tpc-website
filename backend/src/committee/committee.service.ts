import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Committee } from '../schemas/committee/committee.schema';
import { CreateCommitteeDto } from '../schemas/committee/create-committee.dto';

@Injectable()
export class CommitteeService {
  constructor(
    @InjectModel('Committee') private readonly committeeModel: Model<Committee>,
  ) {}

  async create(createCommitteeDto: CreateCommitteeDto): Promise<Committee> {
    const newCommittee = new this.committeeModel(createCommitteeDto);
    return newCommittee.save();
  }

  async findAll(): Promise<Committee[]> {
    return this.committeeModel.find().exec();
  }

  async findOne(id: string): Promise<Committee> {
    return this.committeeModel.findById(id).exec();
  }

  async update(id: string, updateCommitteeDto: CreateCommitteeDto): Promise<Committee> {
    return this.committeeModel.findByIdAndUpdate(id, updateCommitteeDto, { new: true }).exec();
  }

  async remove(id: string): Promise<void> {
    await this.committeeModel.findByIdAndDelete(id).exec();
  }
}
