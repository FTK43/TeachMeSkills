import { Req, Controller, Get, Body, Post, Param, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { JwtAuthGuard } from './utils/jwt-auth.guard';
import { Request } from 'express';

interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    role: string;
  }
}

@Controller('users')
export class AppController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUser(@Param('id') id: string, @Req() req: AuthRequest) {
    const payload = { id, requesterId: req.user.userId };

    return firstValueFrom(this.client.send('get_user', payload));
  }
  
}