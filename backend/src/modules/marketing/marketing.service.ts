import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MarketingService {
  constructor(private prisma: PrismaService) {}

  // --- BANNERS ---
  async getBanners() {
    return this.prisma.banner.findMany({
      orderBy: { sortOrder: 'asc' }
    });
  }

  async createBanner(data: any) {
    return this.prisma.banner.create({
      data
    });
  }

  async updateBanner(id: string, data: any) {
    return this.prisma.banner.update({
      where: { id },
      data
    });
  }

  async deleteBanner(id: string) {
    return this.prisma.banner.delete({
      where: { id }
    });
  }

  // --- COUPONS ---
  async getCoupons() {
    return this.prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createCoupon(data: any) {
    const existing = await this.prisma.coupon.findUnique({ where: { code: data.code } });
    if (existing) {
      throw new ConflictException('Coupon code already exists');
    }
    return this.prisma.coupon.create({
      data
    });
  }

  async updateCoupon(id: string, data: any) {
    if (data.code) {
      const existing = await this.prisma.coupon.findUnique({ where: { code: data.code } });
      if (existing && existing.id !== id) {
        throw new ConflictException('Coupon code already exists');
      }
    }
    return this.prisma.coupon.update({
      where: { id },
      data
    });
  }

  async deleteCoupon(id: string) {
    return this.prisma.coupon.delete({
      where: { id }
    });
  }
}
