import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { results } from './email.processor';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    @InjectQueue('email') private readonly queue: Queue,
  ) {}

  @Post('send')
  async sendEmail(@Body('to') to: string) {
    const jobId = await this.emailService.sendWelcomeEmail(to);

    return {
      jobId,
      message: 'Task is accepted',
    };
  }

  @Get(':id')
  getStatus(@Param('id') id: string) {
    const result = results.get(id);

    if (!result) {
      return {
        status: 'pending',
      };
    }
    return {
      status: 'finished',
      result,
    };
  }

  @Get(':id/progress')
  async getProgress(@Param('id') id: string) {
    const job = await this.queue.getJob(id);

    if (!job) {
      return {
        status: HttpStatus.NOT_FOUND,
      };
    }

    const progress = await job.progress();
    return { jobId: id, progress };
  }
}
