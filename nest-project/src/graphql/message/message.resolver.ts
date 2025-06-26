import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { Message } from './message.model';
import { Inject } from '@nestjs/common';
import { PUB_SUB } from '../pubsub.provider';
import { PubSub } from 'graphql-subscriptions';

let messageId = 1;
const messages: Message[] = [];

@Resolver(() => Message)
export class MessageResolver {
  constructor(@Inject(PUB_SUB) private pubSub: PubSub) {}

  @Mutation(() => Message)
  async addMessage(
    @Args('author') author: string,
    @Args('content') content: string,
  ): Promise<Message> {
    const message = {
      id: messageId++,
      content,
      author,
    };
    messages.push(message);

    await this.pubSub.publish('messageAdded', {
      messageAdded: message,
    });

    return message;
  }

  @Subscription(() => Message, {
    name: 'messageAdded',
  })
  messageAdded() {
    return this.pubSub.asyncIterableIterator('messageAdded');
  }
}
