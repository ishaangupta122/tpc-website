import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PoliciesService } from './policies.service';

/**
 * "College Guidelines & Policies" cards. Reading is public; changes need an
 * admin token (global guard). Body: { title, order, points[], groups[] }.
 */
@Controller('policies')
export class PoliciesController {
  constructor(private readonly service: PoliciesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body() body: Record<string, any>) {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Record<string, any>) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
