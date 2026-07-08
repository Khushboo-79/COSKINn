import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async getHomeDashboard() {
    // Parallelize the queries for maximum performance
    const [categories, fruitIngredients, newestProducts] = await Promise.all([
      this.prisma.category.findMany({
        where: { isActive: true, isDeleted: false },
        select: { id: true, name: true, slug: true, imageUrl: true },
        take: 8
      }),
      // For fruit/concern rail, we query distinct ingredients that are used in LIVE products
      this.prisma.productIngredient.groupBy({
        by: ['name'],
        _count: { productId: true },
        orderBy: { _count: { productId: 'desc' } },
        take: 6
      }),
      this.prisma.product.findMany({
        where: { isDeleted: false, status: 'LIVE' },
        include: {
          variants: true,
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        take: 6
      })
    ]);

    // Stub for hero banners until Day 62
    const heroBanners = [
      {
        id: 'banner_1',
        imageUrl: 'https://coskinn-assets.s3.amazonaws.com/banners/summer-sale.jpg',
        linkUrl: '/products?minPrice=500',
        altText: 'Summer Skincare Sale'
      }
    ];

    return {
      heroBanners,
      categoryRail: categories,
      fruitIngredientRail: fruitIngredients.map(f => ({ name: f.name, productCount: f._count.productId })),
      newArrivals: newestProducts
    };
  }
}
