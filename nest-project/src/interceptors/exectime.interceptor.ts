/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError, map } from 'rxjs';

@Injectable()
export class ExectimeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    const { method, url } = req;

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;
        console.log(`${method} ${url} - выполнен за ${duration}мс`);
      }),
      map((data) => ({
        success: true,
        data,
        duration: `${Date.now() - now}ms`,
      })),
      catchError((err) => {
        const duration = Date.now() - now;
        console.log(
          `${method} ${url} - ошибка за ${duration}мс: ${err.message}`,
        );

        return throwError(
          () =>
            new Error(
              JSON.stringify({
                success: false,
                message: err.message || 'Unknown error',
                duration: `${duration}ms`,
              }),
            ),
        );
      }),
    );
  }
}
