import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SeoService {
  private prisma = new PrismaClient({ log: ['error'] });

  async getProductSeo(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: { seoTitle: true, seoDesc: true, seoKeywords: true, name: true, description: true }
    });
    
    if (!product) throw new NotFoundException('Product not found');
    
    // Fallback to name/desc if explicit SEO fields are missing
    return {
      title: product.seoTitle || product.name,
      description: product.seoDesc || product.description?.substring(0, 160),
      keywords: product.seoKeywords || ''
    };
  }

  async getCategorySeo(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: { name: true, description: true }
    });
    
    if (!category) throw new NotFoundException('Category not found');
    
    return {
      title: `${category.name} | COSKINn`,
      description: category.description || `Browse our collection of ${category.name}`,
      keywords: category.name.toLowerCase()
    };
  }

  async getFruitSeo(name: string) {
    // Generate dynamic SEO for fruit ingredient landing pages
    const fruitName = name.charAt(0).toUpperCase() + name.slice(1);
    return {
      title: `${fruitName} Infused Skincare | COSKINn`,
      description: `Discover the benefits of ${fruitName} for your skin. Shop our exclusive ${fruitName} collection.`,
      keywords: `${fruitName.toLowerCase()}, skincare, coskinn`
    };
  }
}
