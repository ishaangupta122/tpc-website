import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/users/user.schema';
import { LoginDto } from './login.dto';

const BCRYPT_COST = 12;

@Injectable()
export class AuthService {
  // Compared against when the email is unknown, so a wrong email and a wrong
  // password take the same time and can't be told apart.
  private readonly dummyHash = bcrypt.hashSync('not-a-real-password', BCRYPT_COST);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.userModel
      .findOne({ email: email.trim().toLowerCase() })
      .exec();

    const valid = await bcrypt.compare(password, user?.password ?? this.dummyHash);
    if (!user || !valid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });
    return {
      accessToken,
      expiresIn: this.config.get<string>('JWT_EXPIRES_IN', '8h'),
      user: { name: user.name, email: user.email },
    };
  }

  async profile(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) throw new UnauthorizedException('Account no longer exists');
    return { name: user.name, email: user.email };
  }
}
