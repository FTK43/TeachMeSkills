import { Inject, Injectable } from '@nestjs/common';
import { LoggerOptions } from './types';

@Injectable()
export class LoggerService {
  mode?: string;
  constructor({ debug = false }: LoggerOptions) {
    this.mode = debug && 'DEBUG';
  }

  log(...messages: string[]) {
    if (!this.mode) {
      return;
    }
    const time = new Date().toLocaleString('ru');
    console.log(`[${this.mode}] [${time}] `, ...messages);
  }
}
