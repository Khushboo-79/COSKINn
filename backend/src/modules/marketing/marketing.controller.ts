import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  // --- PUBLIC BANNERS ---
  @Get('public/banners')
  getPublicBanners() {
    return this.marketingService.getActiveBanners();
  }

  // --- ADMIN BANNERS ---
  @Get('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getBanners() {
    return this.marketingService.getBanners();
  }

  @Post('banners')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createBanner(@Body() data: any) {
    return this.marketingService.createBanner(data);
  }

  @Put('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateBanner(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateBanner(id, data);
  }

  @Delete('banners/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteBanner(@Param('id') id: string) {
    return this.marketingService.deleteBanner(id);
  }

  // --- COUPONS ---
  @Get('coupons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getCoupons() {
    return this.marketingService.getCoupons();
  }

  @Post('coupons')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createCoupon(@Body() data: any) {
    return this.marketingService.createCoupon(data);
  }

  @Put('coupons/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateCoupon(@Param('id') id: string, @Body() data: any) {
    return this.marketingService.updateCoupon(id, data);
  }

  @Delete('coupons/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteCoupon(@Param('id') id: string) {
    return this.marketingService.deleteCoupon(id);
  }

  // --- CAMPAIGNS ---
  @Get('campaigns')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getCampaigns() {
    return this.marketingService.getCampaigns();
  }

  @Post('campaigns')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createCampaign(@Body() data: { name: string; type: string; audience?: string; scheduledAt?: Date }) {
    return this.marketingService.createCampaign(data);
  }

  // --- ABANDONED CARTS ---
  @Get('abandoned-carts')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getAbandonedCarts(@Query('recovered') recovered?: string) {
    const isRecovered = recovered ? recovered === 'true' : undefined;
    return this.marketingService.getAbandonedCarts(isRecovered);
  }
}

