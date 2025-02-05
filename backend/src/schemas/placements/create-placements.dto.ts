import { IsString, IsArray, IsNumber } from 'class-validator';

export class CreatePlacementDto {
  @IsString()
  readonly year: string;

  @IsArray()
  readonly departments: {
    department: string;
    approvedIntake: number;
    companiesVisited: number;
    studentsPlaced: number;
    avgPackage: string;
  }[];
}
