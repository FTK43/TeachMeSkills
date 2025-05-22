import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform<string> {
  transform(value: string) {
    return value.trim();
  }
}
