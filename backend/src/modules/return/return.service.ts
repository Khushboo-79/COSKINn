import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestReturnDto, ProcessReturnDto, ReturnQcDto } from './dto/return.dto';
import { InventoryService } from '../inventory/inventory.service';

@Injectable()
export class ReturnService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService
  ) {}

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

  async requestReturn(dto: RequestReturnDto, userId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { items: true }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) throw new BadRequestException('Not authorized');

    if (order.status !== 'DELIVERED') {
      throw new BadRequestException('Only DELIVERED orders can be returned');
    }

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

  async processReturn(id: string, dto: ProcessReturnDto) {
    const returnReq = await this.prisma.return.findUnique({ where: { id } });
    if (!returnReq) throw new NotFoundException('Return not found');

    if (returnReq.status !== 'REQUESTED') {
      throw new BadRequestException('Return is not in REQUESTED status');
    }

    return this.prisma.return.update({
      where: { id },
      data: { status: dto.action } // APPROVED or REJECTED
    });
  }

  async processQC(id: string, dto: ReturnQcDto) {
    const returnReq = await this.prisma.return.findUnique({ 
      where: { id },
      include: { items: true, order: true }
    });
    
    if (!returnReq) throw new NotFoundException('Return not found');
    if (returnReq.status !== 'RECEIVED' && returnReq.status !== 'APPROVED') { // Assume warehouse sets to RECEIVED
      throw new BadRequestException('Return must be APPROVED/RECEIVED for QC');
    }

    return this.prisma.$transaction(async (tx) => {
      if (dto.qcResult === 'PASS') {
        // Stock-in to warehouse
        for (const item of returnReq.items) {
          // Hardcoding a default warehouseId for returns (or fetch from config)
          const warehouse = await tx.warehouse.findFirst();
          if (warehouse) {
            await this.inventoryService.stockIn({
              warehouseId: warehouse.id,
              sku: item.sku,
              quantity: item.quantity,
              reference: `Return QC Pass: ${returnReq.id}`
            });
          }
        }
        
        // Trigger refund (mock)
        // await this.paymentService.triggerRefund(...)
        
        return tx.return.update({
          where: { id },
          data: { status: 'REFUNDED' }
        });
      } else {
        // Damaged stock
        for (const item of returnReq.items) {
          await this.inventoryService.reportDamaged({
            sku: item.sku,
            quantity: item.quantity,
            reason: `Return QC Fail: ${returnReq.id}`
          });
        }

        return tx.return.update({
          where: { id },
          data: { status: 'REJECTED_QC' }
        });
      }
    });
  }
}
