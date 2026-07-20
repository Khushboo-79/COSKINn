import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async getHomeDashboard() {
    // Best Sellers logic (mocked by fetching categories related to sunscreen, lipbalms, blushes)
    const bestSellers = await this.prisma.product.findMany({
      where: {
        status: 'LIVE',
        category: {
          name: {
            in: ['Sunscreen', 'Sunscreens', 'Lipbalm', 'Lip Balm', 'Lipbalms', 'Blush', 'Blushes'],
            mode: 'insensitive'
          }
        }
      },
      take: 8,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true
      }
    });

    const newArrivals = await this.prisma.product.findMany({
      where: { status: 'LIVE' },
      orderBy: { createdAt: 'desc' },
      take: 8,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true
      }
    });

    const categories = await this.prisma.category.findMany({
      where: { isActive: true },
      take: 6
    });

    return {
      bestSellers,
      newArrivals,
      categories
    };
  }

  async searchProducts(query: string) {
    if (!query) return [];

    // Basic ILike search for Postgres via Prisma
    return this.prisma.product.findMany({
      where: {
        status: 'LIVE',
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { category: { name: { contains: query, mode: 'insensitive' } } }
        ]
      },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true
      },
      take: 20
    });
  }

  async getProducts(filters: any) {
    const page = Number(filters.page) || 1;
    const limit = 12;
    const skip = (page - 1) * limit;

    const where: any = { status: 'LIVE' };

    if (filters.minPrice || filters.maxPrice) {
      where.discountPrice = {};
      if (filters.minPrice) where.discountPrice.gte = Number(filters.minPrice);
      if (filters.maxPrice) where.discountPrice.lte = Number(filters.maxPrice);
    }

    if (filters.category) {
      if (filters.category === 'cosmetics') {
        where.category = { slug: { in: ['cosmetics', 'lipsticks', 'blushes', 'eyeshadows', 'mascaras', 'concealers', 'highlighters', 'bronzers', 'hybrid-tints'] } };
      } else if (filters.category === 'skincare') {
        where.category = { slug: { in: ['skincare', 'sunscreens', 'cleansers', 'serums', 'moisturizers', 'toners'] } };
      } else if (filters.category.includes(',')) {
        where.category = { slug: { in: filters.category.split(',') } };
      } else {
        where.category = { slug: filters.category };
      }
    }

    if (filters.skinType) {
      where.skinTypes = {
        some: { name: { equals: filters.skinType, mode: 'insensitive' } }
      };
    }

    if (filters.skinConcern) {
      where.concerns = {
        some: { name: { equals: filters.skinConcern, mode: 'insensitive' } }
      };
    }

    if (filters.ingredient) {
      where.ingredients = {
        some: { name: { equals: filters.ingredient, mode: 'insensitive' } }
      };
    }

    let orderBy: any = undefined;
    if (filters.sort) {
      if (filters.sort === 'price_low_high') {
        orderBy = { discountPrice: 'asc' };
      } else if (filters.sort === 'price_high_low') {
        orderBy = { discountPrice: 'desc' };
      } else if (filters.sort === 'best_selling') {
        orderBy = { createdAt: 'asc' }; // Best selling fallback mock
      }
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
          category: true
        }
      }),
      this.prisma.product.count({ where })
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async getProductBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        subcategory: true,
        images: { orderBy: { sortOrder: 'asc' } },
        videos: { orderBy: { sortOrder: 'asc' } },
        variants: true,
        ingredients: true,
        benefits: true,
        skinTypes: true,
        concerns: true,
      }
    });

    if (!product || product.status !== 'LIVE') {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async getProductReviews(productId: string) {
    return this.prisma.productReview.findMany({
      where: { productId, isApproved: true },
      include: {
        user: { select: { firstName: true, lastName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async submitProductReview(productId: string, userId: string, dto: { rating: number; title?: string; content?: string }) {
    return this.prisma.productReview.create({
      data: {
        productId,
        userId,
        rating: dto.rating,
        title: dto.title,
        content: dto.content,
        isApproved: true, // Auto-approve for demo purposes
      }
    });
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      include: {
        subcategories: { where: { isActive: true } }
      }
    });

    if (!category || !category.isActive) {
      throw new NotFoundException('Category not found');
    }

    // Also fetch products for this category
    const products = await this.prisma.product.findMany({
      where: { categoryId: category.id, status: 'LIVE' },
      include: {
        images: { where: { isPrimary: true }, take: 1 }
      },
      take: 20
    });

    return { category, products };
  }

  async getSkinTypes() {
    const skinTypes = await this.prisma.productSkinType.findMany({
      distinct: ['name'],
      select: { name: true }
    });
    return skinTypes.map(st => st.name).filter(name => name);
  }

  async getSkinConcerns() {
    const items = await this.prisma.productConcern.findMany({
      distinct: ['name'],
      select: { name: true }
    });
    return items.map(i => i.name).filter(name => name);
  }

  async getIngredients() {
    const items = await this.prisma.productIngredient.findMany({
      distinct: ['name'],
      select: { name: true }
    });
    return items.map(i => i.name).filter(name => name);
  }

  async getSimilarProducts(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true }
    });

    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.product.findMany({
      where: {
        id: { not: id },
        categoryId: product.categoryId,
        status: 'LIVE'
      },
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true
      },
      take: 4
    });
  }

  async getRecommendations(userId?: string) {
    // Basic recommendation: just return best sellers for now,
    // or personalized logic if userId is provided
    return this.prisma.product.findMany({
      where: { status: 'LIVE' },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        images: { where: { isPrimary: true }, take: 1 },
        category: true
      }
    });
  }
}
