import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerOptions } from './types';

@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerService,
          useValue: new LoggerService(options),
        },
        {
          provide: 'APP_CONFIG',
          useExisting: LoggerService,
        },
      ],
      exports: ['APP_CONFIG', LoggerService],
    };
  }
}
