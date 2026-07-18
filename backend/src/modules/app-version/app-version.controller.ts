import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';
import { AppVersionService } from './app-version.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('app-version')
export class AppVersionController {
  constructor(private readonly appVersionService: AppVersionService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  create(@Body() data: { platform: string; latestVersion: string; minVersion: string; forceUpdate: boolean }) {
    return this.appVersionService.create(data);
  }

  @Get('check')
  checkVersion(@Query('platform') platform: string, @Query('version') version: string) {
    return this.appVersionService.checkVersion(platform, version);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  findAll() {
    return this.appVersionService.findAll();
  }
}
