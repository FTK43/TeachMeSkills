import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailService, EmailProcessor],
  controllers: [EmailController],
})
export class EmailModule {}
