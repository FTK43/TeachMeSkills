import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('get_user')
  getUser({ id, requesterId }: {id: string, requesterId: string }) {
    return {
      id,
      name: 'Test User',
      requesterId,
    }
  }  
}