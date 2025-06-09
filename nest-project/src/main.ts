/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExectimeInterceptor } from './interceptors/exectime.interceptor';
import { LoggingExceptionFilter } from './exceptions/logging.exception';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const emailQueue = app.get<Queue>(getQueueToken('email'));

  createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter,
  });

  const expressApp = app.getHttpAdapter().getInstance() as express.Express;
  expressApp.use('/admin/queues', serverAdapter.getRouter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalFilters(new LoggingExceptionFilter());
  // app.useGlobalInterceptors(new ExectimeInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
