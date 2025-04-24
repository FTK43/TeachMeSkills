import { Injectable } from '@nestjs/common';

const greetings: string[] = [];
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  addGreeting(greeting: string) {
    greetings.push(greeting);
  }
  findGreeting(greetingId: number): string {
    return greetings[greetingId] ? greetings[greetingId] : '';
  }
}
