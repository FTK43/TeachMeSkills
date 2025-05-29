import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrderCommandController {
  constructor(@Inject('READ_SERVICE') 
    private readonly readClient: ClientProxy) {
    }

    private orders: any[] = [];

  @MessagePattern('create_order')
  async create(data: { productId: string }) {
    const order = { id: Date.now(), productId: data.productId };
    this.orders.push(order);
    this.readClient.emit('order.created', order);
    return { status: 'OK', order};
  }
}