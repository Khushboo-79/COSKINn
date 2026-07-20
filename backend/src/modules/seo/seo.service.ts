import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SeoService {
  constructor(private prisma: PrismaService) {}

  async getProductSeo(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      select: { seoTitle: true, seoDesc: true, seoKeywords: true, name: true, description: true, productLine: true, isCrossSegment: true }
    });
    
    if (!product) throw new NotFoundException('Product not found');
    
    // Fallback to name/desc if explicit SEO fields are missing
    return {
      title: product.seoTitle || product.name,
      description: product.seoDesc || product.description?.substring(0, 160),
      keywords: product.seoKeywords || '',
      segment: product.productLine,
      isCrossSegment: product.isCrossSegment
    };
  }

  async getCategorySeo(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug },
      select: { name: true, description: true, productLine: true }
    });
    
    if (!category) throw new NotFoundException('Category not found');
    
    return {
      title: `${category.name} | COSKINn`,
      description: category.description || `Browse our collection of ${category.name}`,
      keywords: category.name.toLowerCase(),
      segment: category.productLine
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

  // --- Admin ---
  async getGlobalSeo() {
    const seo = await this.prisma.globalSeo.findFirst();
    if (!seo) {
      return this.prisma.globalSeo.create({
        data: {
          title: 'COSKINn - Premium Skincare & Cosmetics',
          description: 'Discover our premium range of fruit-infused skincare and cosmetics.',
          keywords: 'skincare, cosmetics, fruit, natural'
        }
      });
    }
    return seo;
  }

  async updateGlobalSeo(data: { title?: string; description?: string; keywords?: string }) {
    const seo = await this.getGlobalSeo();
    return this.prisma.globalSeo.update({
      where: { id: seo.id },
      data
    });
  }
}
