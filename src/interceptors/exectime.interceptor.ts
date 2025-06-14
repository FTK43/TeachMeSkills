import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { catchError, map, Observable, tap, throwError, timestamp } from 'rxjs';

@Injectable()
export class ExecTimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    const req: Request = context.switchToHttp().getRequest();
    const { method, url } = req;

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        console.log(`${method} ${url} exec time ${duration} ms`);
      }),
      map((data) => {
        return {
          data,
          status: 'success',
          timestamp: new Date(),
          timeot: Date.now() - now,
        };
      }),
      catchError((error) => {
        return throwError(
          () =>
            new HttpException(
              {
                errorMessage: error?.message || 'Unknown error',
                status: 'error',
                timestamp: new Date(),
                timeot: Date.now() - now,
              },
              HttpStatus.BAD_REQUEST,
            ),
        );
      }),
    );
  }
}
