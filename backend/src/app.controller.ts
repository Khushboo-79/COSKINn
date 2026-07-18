import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  checkHealth(): { status: string; timestamp: Date } {
    return {
      status: 'UP',
      timestamp: new Date(),
    };
  }

  @Get('country-codes')
  getCountryCodes(): string[] {
    return ['+91', '+1', '+44', '+971', '+61'];
  }
}
