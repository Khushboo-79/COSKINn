import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class HomeService {
  constructor(private prisma: PrismaService) {}

  async getHomeDashboard(segment?: string) {
    const categoryWhere: any = { isActive: true, isDeleted: false };
    const productWhere: any = { isDeleted: false, status: 'LIVE' };
    
    if (segment && segment !== 'BOTH') {
      categoryWhere.OR = [
        { productLine: segment },
        { productLine: 'BOTH' }
      ];
      
      productWhere.AND = [
        {
          OR: [
            { productLine: segment },
            { productLine: 'BOTH' },
            { isCrossSegment: true }
          ]
        }
      ];
    }

    const [categories, newestProducts, allIngredients] = await Promise.all([
      this.prisma.category.findMany({
        where: categoryWhere,
        select: { id: true, name: true, slug: true, imageUrl: true },
        take: 8
      }),
      this.prisma.product.findMany({
        where: productWhere,
        include: {
          variants: true,
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        },
        orderBy: { createdAt: 'desc' },
        take: 6
      }),
      this.prisma.productIngredient.findMany({
        where: { product: productWhere },
        select: { name: true }
      })
    ]);

    const ingredientCountMap: Record<string, number> = {};
    for (const ing of allIngredients) {
      ingredientCountMap[ing.name] = (ingredientCountMap[ing.name] || 0) + 1;
    }
    
    const fruitIngredients = Object.entries(ingredientCountMap)
      .map(([name, count]) => ({ name, productCount: count }))
      .sort((a, b) => b.productCount - a.productCount)
      .slice(0, 6);

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
      fruitIngredientRail: fruitIngredients,
      newArrivals: newestProducts
    };
  }
}
