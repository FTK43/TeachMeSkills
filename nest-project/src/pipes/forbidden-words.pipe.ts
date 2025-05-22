import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ForbiddenWordsPipe implements PipeTransform<string> {
  private forbiddenWords = ['андрей', 'антон'];

  transform(value: string) {
    const words = value.split(' ');

    const censored = words.map((word) => {
      const cleaned = word.toLowerCase().replace(/[.,!?]/g, '');

      if (this.forbiddenWords.includes(cleaned)) {
        return '*'.repeat(cleaned.length);
      }

      return word;
    });

    return censored.join(' ');
  }
}
