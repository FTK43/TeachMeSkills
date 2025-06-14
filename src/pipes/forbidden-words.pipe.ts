import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class ForbiddenWordsPipe implements PipeTransform<string> {
  private forbiddenWords = ['козёл', 'коза'];

  transform(value: string, metadata: ArgumentMetadata) {
    const val = value.toLowerCase().trim();
    return this.forbiddenWords.includes(val) ? '***' : value;
  }
}
