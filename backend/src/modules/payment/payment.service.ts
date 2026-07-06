import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getOrderPayments(orderId: string) {
    const payments = await this.prisma.orderPayment.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' }
    });

    return payments;
  }
}
