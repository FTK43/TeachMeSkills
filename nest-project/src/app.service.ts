import { Injectable, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import * as IORedis from 'ioredis';

@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  getHello(): string {
    return 'Hello World!';
  }

  async doExpensiveOperation(id: number): Promise<any> {
    const key = `/manual-cache:${id}`;

    const cached = await this.cacheManager.get(key);
    if (cached) {
      console.log('FROM REDIS CACHE');
      return cached;
    }

    console.log('NEW DATA');
    const result = {
      val: Math.random(),
      time: new Date().toISOString(),
    };

    await this.cacheManager.set(key, result, 15);
    console.log('SAVED TO REDIS CACHE');
    return result;
  }

  async invalidateCache(val: number, time: number, id: number) {
    const key = `/manual-cache:${id}`;
    await this.cacheManager.del(key);

    console.log('КЭШ СБРОШЕН');

    return { val, time };
  }

  // async invalidateByPattern() {
  //   const pattern = '*manual*';
// 
  //   const keys = await this.redis().keys(pattern);
// 
  //   await this.redis().del(...keys);
// 
  //   return keys;
  // }

  
}
