import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class OrderReadController {
  private orders: any[] = [];

  @EventPattern('order.created')
  handleOrderCreated(order: any) {
    this.orders.push(order);
    console.log('Saved to read model:', order);
  }
}