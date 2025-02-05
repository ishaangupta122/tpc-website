import { Controller, Post, Body, Headers } from '@nestjs/common'; 
import { AuthService } from './auth.service';
import { CreateUserDto } from '../schemas/users/create-user.dto';
import { LoginDto } from '../schemas/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('verify-email')
  async verifyEmail(@Headers('Authorization') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
