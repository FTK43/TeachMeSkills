import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderCommandController } from './order.command.controller';

@Module({ 
  imports: [
    ClientsModule.register([
      {
        name: 'READ_SERVICE',
        transport: Transport.TCP,
        options: { port: 4002 },
      },
    ]),
  ],
  controllers: [OrderCommandController],
})
export class AppModule {}
