import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  // --- ARTICLES (BLOG / TIPS) ---
  async getArticles(
    type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE',
    publishedOnly: boolean = true,
  ) {
    const where: any = {};
    if (type) where.type = type;
    if (publishedOnly) where.published = true;
    return this.prisma.contentArticle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getArticleBySlug(slug: string) {
    const article = await this.prisma.contentArticle.findUnique({
      where: { slug },
    });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async createArticle(data: any) {
    return this.prisma.contentArticle.create({ data });
  }

  async updateArticle(id: string, data: any) {
    return this.prisma.contentArticle.update({ where: { id }, data });
  }

  async deleteArticle(id: string) {
    return this.prisma.contentArticle.delete({ where: { id } });
  }

  // --- FAQs ---
  async getFaqs() {
    return this.prisma.faq.findMany({ orderBy: { orderIndex: 'asc' } });
  }

  async createFaq(data: {
    question: string;
    answer: string;
    category?: string;
    orderIndex?: number;
  }) {
    return this.prisma.faq.create({ data });
  }

  async updateFaq(id: string, data: any) {
    return this.prisma.faq.update({ where: { id }, data });
  }

  async deleteFaq(id: string) {
    return this.prisma.faq.delete({ where: { id } });
  }

  async getGlobalSeo() {
    let seo = await this.prisma.globalSeo.findFirst();
    if (!seo) {
      seo = await this.prisma.globalSeo.create({
        data: {
          title: 'Fairenne',
          description: 'Premium Skincare',
          keywords: 'skincare, beauty',
        },
      });
    }
    return seo;
  }

  async updateGlobalSeo(data: any) {
    const seo = await this.getGlobalSeo();
    return this.prisma.globalSeo.update({
      where: { id: seo.id },
      data: {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
      },
    });
  }

  // --- VIDEOS ---
  async getVideos() {
    /* return this.prisma.tutorialVideo.findMany({
      orderBy: { createdAt: 'desc' }
    }); */
  }

  async createVideo(data: { title: string; url: string; size?: string }) {
    /* return this.prisma.tutorialVideo.create({ data }); */
  }

  async deleteVideo(id: string) {
    /* return this.prisma.tutorialVideo.delete({ where: { id } }); */
  }

  // --- TESTIMONIALS ---
  async getTestimonials(platform?: 'SKINCARE' | 'COSMETICS') {
    const where = platform ? { platform } : {};
    return this.prisma.testimonial.findMany({
      where: { ...where, isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
  }

  async createTestimonial(data: any) {
    return this.prisma.testimonial.create({ data });
  }

  // --- PROMOTIONS ---
  async getPromotions(platform?: 'SKINCARE' | 'COSMETICS') {
    const where = platform ? { platform } : {};
    return this.prisma.promotion.findMany({
      where: { ...where, isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
  }

  async createPromotion(data: any) {
    return this.prisma.promotion.create({ data });
  }

  // --- FOOTER DATA ---
  async getFooterData(platform?: 'SKINCARE' | 'COSMETICS') {
    // 1. Fetch Global SEO for brand description
    const globalSeo = await this.prisma.globalSeo.findFirst();
    const brandDescription = globalSeo?.description || 'Juicy, hydrating, mood-lifting skincare — squeezed from real fruit science.';

    // 2. Fetch top categories for Shop links
    const categoryWhere: any = { isActive: true, isDeleted: false };
    if (platform) {
      categoryWhere.OR = [{ productLine: platform }, { productLine: 'BOTH' }];
    }
    
    const topCategories = await this.prisma.category.findMany({
      where: categoryWhere,
      select: { name: true, slug: true },
      take: 4,
    });

    const shopLinks = topCategories.map(cat => ({
      label: cat.name,
      path: `/collections/${cat.slug}`,
    }));
    
    // Always append Gift Cards
    shopLinks.push({ label: 'Gift Cards', path: '/gift-cards' });

    // 3. Static / Hardcoded CMS sections for Journal & Support
    // (These could be fetched from ContentArticle and Faq in the future)
    const journalLinks = [
      { label: 'Skin School', path: '/journal' },
      { label: 'Ingredient Guide', path: '/journal' },
      { label: 'Behind the Brand', path: '/about' },
      { label: 'Rituals', path: '/journal' },
    ];

    const supportLinks = [
      { label: 'Contact', path: '/contact' },
      { label: 'Shipping', path: '/shipping' },
      { label: 'Returns', path: '/returns' },
      { label: 'FAQ', path: '/faq' },
      { label: 'Track Order', path: '/track-order' },
    ];

    return {
      brand: {
        description: brandDescription,
        socials: [
          { platform: 'instagram', url: 'https://instagram.com/fairenne' },
          { platform: 'youtube', url: 'https://youtube.com/@fairenne' },
          { platform: 'twitter', url: 'https://twitter.com/fairenne' },
          { platform: 'tiktok', url: 'https://tiktok.com/@fairenne' },
        ]
      },
      shopLinks,
      journalLinks,
      supportLinks,
    };
  }
}
