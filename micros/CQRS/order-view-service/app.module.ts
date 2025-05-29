import { Module } from '@nestjs/common';
import { OrderReadController } from './order.read.controller';

@Module({
  controllers: [OrderReadController],
})
export class AppModule {}