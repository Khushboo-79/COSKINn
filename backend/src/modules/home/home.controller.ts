import { Controller, Get, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getDashboard(@Query('segment') segment?: string) {
    return this.homeService.getHomeDashboard(segment ? segment.toUpperCase() : undefined);
  }
}
