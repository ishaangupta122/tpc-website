import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schemas/users/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    createUserDto: {
      name: string;
      email: string;
      password: string;
      firebaseUid: string;
    },
  ) {
    return this.usersService.createUser(
      createUserDto.name,
      createUserDto.email,
      createUserDto.password,
      createUserDto.firebaseUid,
    );
  }

  @Get()
  async findAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
