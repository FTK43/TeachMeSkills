/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();

    const token = client.handshake.query?.token;

    if (!token || token !== 'valid_token') {
      client.disconnect();
      throw new UnauthorizedException('Invalid or missing token');
    }

    client.data.user = { userId: 100 };

    return true;
  }
}
