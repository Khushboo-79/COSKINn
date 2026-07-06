import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateReturnStatusDto, CreateMockReturnDto } from './dto/return.dto';

@Injectable()
export class ReturnService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: string) {
    const where = status ? { status } : {};
    
    return this.prisma.return.findMany({
      where,
      include: {
        order: {
          select: { id: true, user: { select: { email: true, firstName: true } } }
        },
        items: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateStatus(id: string, dto: UpdateReturnStatusDto) {
    const returnReq = await this.prisma.return.findUnique({ where: { id } });
    if (!returnReq) throw new NotFoundException('Return not found');

    return this.prisma.return.update({
      where: { id },
      data: { status: dto.status }
    });
  }

  // Temporary mock function for testing
  async createMockReturn(dto: CreateMockReturnDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { items: true }
    });

    if (!order) throw new NotFoundException('Order not found');

    return this.prisma.return.create({
      data: {
        orderId: dto.orderId,
        status: 'REQUESTED',
        reason: dto.reason,
        refundType: dto.refundType,
        items: {
          create: order.items.map(item => ({
            sku: item.sku,
            quantity: item.quantity
          }))
        }
      }
    });
  }
}
