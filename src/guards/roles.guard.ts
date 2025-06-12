import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector?.getAllAndOverride<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const { user = null } = req;

    return requiredRoles.includes(user?.role);
  }
}
