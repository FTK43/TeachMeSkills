import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  @Cron('*/3 * * * * *')
  async sendWelcomeEmail(receiverAddress: string) {
    const job = await this.emailQueue.add(
      'send-welcome-email',
      { receiverAddress },
      { attempts: 5, backoff: 5 * 1000, delay: 500 },
    );

    console.log('Поставлена задача в очередь');

    return job.id;
  }
}
