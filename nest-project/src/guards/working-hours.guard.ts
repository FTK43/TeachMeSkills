import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class WorkingHoursGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay();

    if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
      return true;
    }

    throw new ForbiddenException('Access allowed during working hours only');
  }
}
