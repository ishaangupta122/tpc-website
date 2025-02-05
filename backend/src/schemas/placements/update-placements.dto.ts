import { IsString, IsNumber } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  readonly department: string;

  @IsNumber()
  readonly approvedIntake: number;

  @IsNumber()
  readonly companiesVisited: number;

  @IsNumber()
  readonly studentsPlaced: number;

  @IsString()
  readonly avgPackage: string;
}
