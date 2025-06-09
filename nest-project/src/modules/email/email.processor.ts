import { Process, Processor } from '@nestjs/bull';
import { Job, JobId } from 'bull';

const results = new Map<JobId, any>();

@Processor('email')
export class EmailProcessor {
  @Process('send-welcome-email')
  async handleWelcomeEmail(job: Job) {
    console.log(`Отправка email`);

    if ((Number(job.id) + job.attemptsMade) % 2 !== 0) {
      console.log('Ошибка отправки');
      throw new Error('Ошибка отправки');
    }

    const totalSteps = 5;

    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((res) => setTimeout(res, 1500));
      const percentage = Math.round((i / totalSteps) * 100);

      await job.progress(percentage);
      console.log(`Прогресс: ${percentage}`);
    }

    const result = {
      generatedAt: new Date().toISOString(),
    };

    results.set(job.id, result);
    return result;
  }
}

export { results };
