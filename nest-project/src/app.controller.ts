import { Controller, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@Controller()
// @UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('time')
  @CacheKey('time-key')
  @CacheTTL(5)
  getTime() {
    const date = Math.random();

    return date;
  }

  @Get('manual-cache/:id')
  getCached(@Param('id', ParseIntPipe) id: number) {
    return this.appService.doExpensiveOperation(id);
  }

  @Post('invalidate-cache/:id')
  invalidateCache(@Param('id', ParseIntPipe) id: number) {
    this.appService.invalidateCache(Math.random(), 0, id);
  }
}
