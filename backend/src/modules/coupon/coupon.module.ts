import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController, AdminCouponController } from './coupon.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CouponController, AdminCouponController],
  providers: [CouponService],
  exports: [CouponService],
})
export class CouponModule {}
