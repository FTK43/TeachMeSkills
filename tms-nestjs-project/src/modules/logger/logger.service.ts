import { Injectable } from '@nestjs/common';
import { LoggerImportanceLevel } from './types';

@Injectable()
export class LoggerService {
  constructor(private loggerImportanceLevel: LoggerImportanceLevel) {}

  logMessage(level: LoggerImportanceLevel, message: string) {
    if (message) {
      console.log(`${level}: ${message}`);
    }
  }
}
