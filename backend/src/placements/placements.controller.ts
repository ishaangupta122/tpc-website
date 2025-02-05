import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { CreatePlacementDto } from '../schemas/placements/create-placements.dto';
import { UpdateDepartmentDto } from '../schemas/placements/update-placements.dto';
import { Placements } from '../schemas/placements/placements.schema';

@Controller('placements')
export class PlacementsController {
  constructor(private readonly placementsService: PlacementsService) {}

  // Create a new placement
  @Post()
  create(@Body() createPlacementDto: CreatePlacementDto): Promise<Placements> {
    return this.placementsService.create(createPlacementDto);
  }

  // Get all placements
  @Get()
  findAll(): Promise<Placements[]> {
    return this.placementsService.findAll();
  }

  // Get a single placement by ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Placements> {
    return this.placementsService.findOne(id);
  }

  // Update a placement
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlacementDto: CreatePlacementDto,
  ): Promise<Placements> {
    return this.placementsService.update(id, updatePlacementDto);
  }

  // Delete a placement
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.placementsService.remove(id);
  }

  // Add a department to a placement
  @Post(':id/departments')
  addDepartment(
    @Param('id') id: string,
    @Body() department: UpdateDepartmentDto,
  ): Promise<Placements> {
    return this.placementsService.addDepartment(id, department);
  }

  // Update a department in a placement
  @Put(':id/departments/:departmentId')
  updateDepartment(
    @Param('id') id: string,
    @Param('departmentId') departmentId: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<Placements> {
    return this.placementsService.updateDepartment(id, departmentId, updateDepartmentDto);
  }

  // Remove a department from a placement
  @Delete(':id/departments/:departmentId')
  removeDepartment(
    @Param('id') id: string,
    @Param('departmentId') departmentId: string,
  ): Promise<Placements> {
    return this.placementsService.removeDepartment(id, departmentId);
  }
}
