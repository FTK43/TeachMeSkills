import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const locale = req.headers['accept-language'] ?? 'en';
    req['locale'] = locale;

    next();
  }
}
