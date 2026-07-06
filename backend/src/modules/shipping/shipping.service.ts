import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ShippingService {
  constructor(private prisma: PrismaService) {}

  async getOrderShipments(orderId: string) {
    return this.prisma.orderShipment.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
