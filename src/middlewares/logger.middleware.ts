import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  use(req: Response, res: Request, next: (error?: Error | any) => void) {
    throw new Error('Method not implemented.');
  }
}
