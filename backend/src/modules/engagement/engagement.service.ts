import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class EngagementService {
  private prisma = new PrismaClient({ log: ['error'] });

  // --- REVIEWS ---

  async getProductReviews(productId: string) {
    return this.prisma.productReview.findMany({
      where: { productId, isApproved: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async addReview(userId: string, productId: string, data: { rating: number, title?: string, content?: string }) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.productReview.create({
      data: {
        userId,
        productId,
        rating: data.rating,
        title: data.title,
        content: data.content,
        isApproved: false // Requires admin approval before going live
      }
    });
  }

  // --- Q&A ---

  async getProductQuestions(productId: string) {
    return this.prisma.productQuestion.findMany({
      where: { productId, isApproved: true },
      orderBy: { createdAt: 'desc' },
      include: {
        answers: { where: { isApproved: true } }
      }
    });
  }

  async addQuestion(userId: string, productId: string, content: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    return this.prisma.productQuestion.create({
      data: {
        userId,
        productId,
        content,
        isApproved: false
      }
    });
  }
}
