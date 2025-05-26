import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ExectimeInterceptor } from './interceptors/exectime.interceptor';
import { LoggingExceptionFilter } from './exceptions/logging.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new LoggingExceptionFilter());
  // app.useGlobalInterceptors(new ExectimeInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
