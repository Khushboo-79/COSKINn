import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CouponService {
  constructor(private prisma: PrismaService) {}

  async applyCoupon(userId: string, code: string) {
    const coupon = await this.prisma.coupon.findUnique({ where: { code } });
    if (!coupon) throw new NotFoundException('Invalid coupon code');

    // Basic Validation
    if (coupon.isActive === false) throw new BadRequestException('Coupon is inactive');
    if (coupon.endDate && new Date() > coupon.endDate) throw new BadRequestException('Coupon expired');
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) throw new BadRequestException('Coupon limit reached');

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: true } } }
    });

    if (!cart || cart.items.length === 0) throw new BadRequestException('Cart is empty');

    // Calculate cart total using product price (matching cart.service.ts)
    const cartTotal = cart.items.reduce((acc, item) => {
      const price = Number(item.product.discountPrice || item.product.mrp);
      return acc + (price * item.quantity);
    }, 0);

    if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
      throw new BadRequestException(`Minimum purchase of ${coupon.minPurchase} required`);
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = cartTotal * (coupon.discountValue / 100);
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    return {
      message: 'Coupon applied successfully',
      code: coupon.code,
      discountAmount,
      newTotal: cartTotal - discountAmount
    };
  }

  // --- ADMIN METHODS ---

  async getAvailableCoupons(userId: string) {
    const now = new Date();
    return this.prisma.coupon.findMany({
      where: {
        isActive: true,
        OR: [
          { endDate: null },
          { endDate: { gt: now } }
        ]
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createCoupon(data: any) {
    return this.prisma.coupon.create({ data });
  }

  async getAdminCoupons() {
    return this.prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateCoupon(id: string, data: any) {
    const coupon = await this.prisma.coupon.findUnique({ where: { id } });
    if (!coupon) throw new NotFoundException('Coupon not found');
    
    return this.prisma.coupon.update({
      where: { id },
      data
    });
  }
}
