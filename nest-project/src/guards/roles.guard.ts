import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAll<string[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    console.log('required roles' + JSON.stringify(requiredRoles));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return requiredRoles.includes(user?.role);
  }
}
