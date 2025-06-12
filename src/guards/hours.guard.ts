import { CanActivate, ForbiddenException } from '@nestjs/common';

export const HoursGuard = ({ start, end }: { start: number; end: number }) => {
  return class implements CanActivate {
    canActivate(): boolean {
      const now = new Date().getHours();

      if (now >= start && now <= end) {
        return true;
      }

      throw new ForbiddenException('Приходите завтра');
    }
  };
};
