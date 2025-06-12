import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const id = uuid();
    req.headers['x-request-id'] ||= id;
    res.setHeader('x-request-id', id);

    next();
  }
}
