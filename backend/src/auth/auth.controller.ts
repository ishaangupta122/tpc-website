import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { Public, RequiresAuth } from './public.decorator';

@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Brute-force protection: 5 attempts per minute per IP.
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  /** The signed-in admin (also a cheap way to check a stored token is still valid). */
  @RequiresAuth()
  @Get('me')
  me(@Req() request: { user: { userId: string } }) {
    return this.authService.profile(request.user.userId);
  }
}
