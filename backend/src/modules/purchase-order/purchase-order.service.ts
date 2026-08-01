import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreatePurchaseOrderDto, CreateGrnDto } from './dto/purchase-order.dto';

@Injectable()
export class PurchaseOrderService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService
  ) {}

  async create(dto: CreatePurchaseOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: {
        warehouseId: dto.warehouseId,
        supplierId: dto.supplierId,
        status: dto.status || 'DRAFT',
      },
    });
  }

  async findAll() {
    return this.prisma.purchaseOrder.findMany({
      include: { warehouse: true, grns: true, supplier: true },
    });
  }

  async findOne(id: string) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id },
      include: { warehouse: true, grns: true, supplier: true },
    });
    if (!po) throw new NotFoundException('Purchase Order not found');
    return po;
  }

  async createGrn(dto: CreateGrnDto) {
    const po = await this.prisma.purchaseOrder.findUnique({
      where: { id: dto.purchaseOrderId }
    });
    
    if (!po) throw new NotFoundException('Purchase Order not found');

    // Create GRN and apply stock-in within a transaction
    return this.prisma.$transaction(async (prisma) => {
      const grn = await prisma.goodsReceivedNote.create({
        data: {
          purchaseOrderId: dto.purchaseOrderId,
        }
      });

      // Update PO Status
      await prisma.purchaseOrder.update({
        where: { id: dto.purchaseOrderId },
        data: { status: 'RECEIVED' }
      });

      // Trigger stock-in for each item
      for (const item of dto.items) {
        await this.inventoryService.stockIn({
          warehouseId: po.warehouseId,
          sku: item.sku,
          quantity: item.quantity,
          reference: `GRN: ${grn.id}`
        });
      }

      return grn;
    });
  }
}
