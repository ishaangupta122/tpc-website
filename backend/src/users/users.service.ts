import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { User } from '../schemas/users/user.schema';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(name: string, email: string, password: string, firebaseUid: string): Promise<User> {
    try {
      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new this.userModel({
        name,
        email,
        password: hashedPassword,
        firebaseUid,
      });

      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    if (!user) return false;

    return bcrypt.compare(password, user.password);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async update(id: string, updateUserDto: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async remove(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
