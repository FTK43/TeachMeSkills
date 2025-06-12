import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorizationHeaderValue: string = req.headers['authorization'];

    if (
      !authorizationHeaderValue ||
      !authorizationHeaderValue.startsWith('Bearer')
    ) {
      throw new UnauthorizedException('No token');
    }

    const token = authorizationHeaderValue.split(' ')[1];

    try {
      const payload = this.JwtService.verify(token, {
        secret: 'super-secret-key-super-secret-key',
      });

      req.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
