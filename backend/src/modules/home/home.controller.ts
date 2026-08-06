import { Controller, Get, Query, Post, Delete, Put, Body, Param, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  async getDashboard(@Query('segment') segment?: string) {
    return this.homeService.getHomeDashboard(
      segment ? segment.toUpperCase() : undefined,
    );
  }

  // --- ADMIN ENDPOINTS ---

  @Post('admin/banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async createBanner(@Body() data: any) {
    return this.homeService.createBanner(data);
  }

  @Delete('admin/banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async deleteBanner(@Param('id') id: string) {
    return this.homeService.deleteBanner(id);
  }

  @Put('admin/bestsellers/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async addBestseller(@Param('productId') productId: string) {
    return this.homeService.setBestseller(productId, true);
  }

  @Delete('admin/bestsellers/:productId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async removeBestseller(@Param('productId') productId: string) {
    return this.homeService.setBestseller(productId, false);
  }
}
