import { Controller, Post, Body, UseGuards, Request, Get, Patch, Param } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('cart/coupon')
@UseGuards(JwtAuthGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('apply')
  async applyCoupon(@Request() req, @Body('code') code: string) {
    return this.couponService.applyCoupon(req.user.id, code);
  }

  @Get('available')
  async getAvailableCoupons(@Request() req) {
    return this.couponService.getAvailableCoupons(req.user.id);
  }
}

@Controller('admin/coupons')
export class AdminCouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async createCoupon(@Body() data: any) {
    return this.couponService.createCoupon(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async getAdminCoupons() {
    return this.couponService.getAdminCoupons();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async updateCoupon(@Param('id') id: string, @Body() data: any) {
    return this.couponService.updateCoupon(id, data);
  }
}
