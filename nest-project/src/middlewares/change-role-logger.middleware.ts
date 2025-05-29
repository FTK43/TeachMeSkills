import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ChangeRoleLoggerMiddleware implements NestMiddleware {
  constructor() {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Attempt to set user with id ${req.body.userId} role ${req.body.newRole}`,
    );
    next();
  }
}
