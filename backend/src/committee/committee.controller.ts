import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CommitteeService } from './committee.service';
import { CreateCommitteeDto } from '../schemas/committee/create-committee.dto';

@Controller('members')
export class CommitteeController {
  constructor(private readonly committeeService: CommitteeService) {}

  @Post()
  create(@Body() createCommitteeDto: CreateCommitteeDto) {
    return this.committeeService.create(createCommitteeDto);
  }

  @Get()
  findAll() {
    return this.committeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.committeeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommitteeDto: CreateCommitteeDto,
  ) {
    return this.committeeService.update(id, updateCommitteeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.committeeService.remove(id);
  }
}
