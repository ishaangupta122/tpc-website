import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtUtilityService {
  constructor(private readonly jwtService: JwtService) {}

  
  generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  decodeToken(token: string) {
   // console.log(token)
    return this.jwtService.decode(token);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}