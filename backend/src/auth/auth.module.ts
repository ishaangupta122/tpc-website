import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseService } from './firebase.service';
import { User, UserSchema } from '../schemas/users/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtUtilityService } from './jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [JwtService, JwtStrategy, JwtUtilityService, AuthService, FirebaseService],
})
export class AuthModule {}
