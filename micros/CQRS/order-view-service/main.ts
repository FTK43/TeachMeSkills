import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const PORT = 4002;
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { 
      host: '127.0.0.1',
      port: PORT,
    },
  });
  await app.listen();
  console.log(`Order Read service listening on ${PORT}`);
}

bootstrap();
