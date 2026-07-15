import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  // --- ARTICLES (BLOG / TIPS) ---
  async getArticles(type?: 'BLOG' | 'TIP', publishedOnly: boolean = true) {
    const where: any = {};
    if (type) where.type = type;
    if (publishedOnly) where.published = true;
    return this.prisma.contentArticle.findMany({ where, orderBy: { createdAt: 'desc' } });
  }

  async getArticleBySlug(slug: string) {
    const article = await this.prisma.contentArticle.findUnique({ where: { slug } });
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

  async createFaq(data: { question: string; answer: string; category?: string; orderIndex?: number }) {
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
          title: 'COSKINn',
          description: 'Premium Skincare',
          keywords: 'skincare, beauty'
        }
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
        keywords: data.keywords
      }
    });
  }
}
