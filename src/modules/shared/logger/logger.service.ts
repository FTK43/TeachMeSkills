import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  constructor(private readonly level: string) {}
  log(message: string) {
    console.log(`[${this.level}]: ${message}`);
  }
}
