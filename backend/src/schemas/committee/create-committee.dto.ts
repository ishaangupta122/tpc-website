import { IsString } from 'class-validator';

export class CreateCommitteeDto {
  @IsString()
  readonly info: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly designation: string;
}
