import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('marketing')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  // --- BANNERS ---
  @Get('banners')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getBanners() {
    return this.marketingService.getBanners();
  }

  @Post('banners')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createBanner(@Body() data: any) {
    return this.marketingService.createBanner(data);
  }

  @Put('banners/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateBanner(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateBanner(id, data);
  }

  @Delete('banners/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteBanner(@Param('id') id: string) {
    return this.marketingService.deleteBanner(id);
  }

  // --- COUPONS ---
  @Get('coupons')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getCoupons() {
    return this.marketingService.getCoupons();
  }

  @Post('coupons')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createCoupon(@Body() data: any) {
    return this.marketingService.createCoupon(data);
  }

  @Put('coupons/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateCoupon(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateCoupon(id, data);
  }

  @Delete('coupons/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteCoupon(@Param('id') id: string) {
    return this.marketingService.deleteCoupon(id);
  }
}
