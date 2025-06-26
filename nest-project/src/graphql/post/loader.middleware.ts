/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { PostLoader } from './post.loader';

@Injectable({ scope: Scope.REQUEST })
export class LoaderMiddleware implements NestMiddleware {
  constructor(private readonly postLoader: PostLoader) {}

  use(req: any, res: any, next: (error?: any) => void) {
    (req as any).loaders = {
      postLoader: this.postLoader,
    };
    next();
  }
}
