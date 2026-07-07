import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('cart/coupon')
@UseGuards(JwtAuthGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('apply')
  async applyCoupon(@Request() req, @Body('code') code: string) {
    return this.couponService.applyCoupon(req.user.id, code);
  }
}
