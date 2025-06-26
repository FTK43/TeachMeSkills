import { Module } from '@nestjs/common';
import { PubSubProvider } from '../pubsub.provider';
import { MessageResolver } from './message.resolver';

@Module({
  providers: [MessageResolver, PubSubProvider],
})
export class MessageModule {}
