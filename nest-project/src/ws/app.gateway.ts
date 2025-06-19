/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from '../guards/ws-auth.guard';

@WebSocketGateway()
@Injectable()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private activeClients = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;

    if (!userId) {
      console.log('NO USER ID, DISCONNECTING');
      client.disconnect();
      return;
    }

    this.activeClients.set(userId, client.id);
    console.log(`User ${userId} connected as ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = this.activeClients.get(client.id);
    this.activeClients.delete(client.id);

    console.log(`user ${userId} disconnected`);
  }

  @SubscribeMessage('ping')
  handlePing(@MessageBody() payload: string): void {
    console.log('received message of type ping:', payload);

    this.server.emit('pong', 'HELLO FROM WS SERVER');
  }

  @SubscribeMessage('chat')
  handleChat(@MessageBody() msg: string, @ConnectedSocket() client: Socket) {
    console.log(`received ${msg} from ${client.id}`);

    client.broadcast.emit('chat', {
      from: client.id,
      msg,
    });

    return 'MESSAGE RECEIVED';
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    console.log(`Client ${client.id} joined room ${room}`);
    client.emit('joined room', room);
  }

  @SubscribeMessage('sendToRoom')
  handleRoomMessage(
    @MessageBody() payload: { room: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`${client.id} to ${payload.room}: ${payload.message}`);

    this.server.to(payload.room).emit('roomMessage', {
      from: client.id,
      message: payload.message,
    });
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('authMessage')
  handleAuthMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('AUTH MESSAGE FROM:', JSON.stringify(client.data.user));
    return message;
  }

  emitToAll(event: string, payload: any) {
    this.server.emit(event, payload);
  }

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() payload: { to: string; message: string },
    @ConnectedSocket() sender: Socket,
  ) {
    const receiverSocketId = this.activeClients.get(payload.to);

    if (!receiverSocketId) {
      console.log(`USER ${payload.to} not connected`);
      return;
    }

    this.server.to(receiverSocketId).emit('privateMessage', {
      from: sender.id,
      message: payload.message,
    });
  }
}
