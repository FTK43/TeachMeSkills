import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { GreetingDto } from './greeting.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  addGreeting(@Body() greetingDto: GreetingDto): void {
    this.appService.addGreeting(greetingDto.greeting);
  }

  // @Get(':id')
  // findGreeting(@Param('id') greetingId: number): string {
  //   return this.appService.findGreeting(greetingId);
  // }

  // @Get('findOne')
  // findGreetingByQueryParam(@Query('greetingId') greetingId): string {
  //   return this.appService.findGreeting(Number(greetingId));
  // }
}
