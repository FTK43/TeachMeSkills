import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerImportanceLevel } from './types';

@Module({})
export class LoggerModule {
  static forRoot(options: LoggerImportanceLevel): DynamicModule {
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
