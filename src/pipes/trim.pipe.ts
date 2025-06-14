import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TrimPipe implements PipeTransform<string> {
  transform(value: string) {
    return typeof value === 'string' ? value.trim() : value;
  }
}
