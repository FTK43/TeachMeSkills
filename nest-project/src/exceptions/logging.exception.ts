/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class LoggingExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'INTERNAL SERVER ERROR';

    console.error(`[${new Date().toISOString()}]`, message);

    response.status(status).json({
      success: false,
      message,
      code: status,
      time: new Date().toISOString(),
    });
  }
}
