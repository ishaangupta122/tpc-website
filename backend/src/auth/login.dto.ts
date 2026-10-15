import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @MaxLength(254)
  email: string;

  // Upper bound: bcrypt only reads the first 72 bytes, and long inputs are a cheap DoS.
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  password: string;
}
