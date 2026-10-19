import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, REQUIRES_AUTH_KEY } from './public.decorator';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export interface AuthenticatedUser {
  userId: string;
  email: string;
}

/**
 * Global guard. Reading is public (the college website needs it); anything
 * that changes data (POST / PUT / PATCH / DELETE) needs a valid admin token.
 * A new write route is therefore protected by default.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, targets)) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const requiresAuth = this.reflector.getAllAndOverride<boolean>(
      REQUIRES_AUTH_KEY,
      targets,
    );
    if (SAFE_METHODS.has(request.method) && !requiresAuth) return true;

    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException('Authentication required');

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request.user = {
        userId: payload.sub,
        email: payload.email,
      } as AuthenticatedUser;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    return true;
  }

  private extractToken(request: {
    headers: Record<string, string | undefined>;
  }): string | undefined {
    const [type, token] = (request.headers.authorization || '').split(' ');
    return type === 'Bearer' && token ? token : undefined;
  }
}
