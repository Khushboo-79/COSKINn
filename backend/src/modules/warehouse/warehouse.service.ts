import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService
  ) {}

  async createPurchaseOrder(dto: CreatePurchaseOrderDto) {
    return this.prisma.purchaseOrder.create({
      data: {
        warehouseId: dto.warehouseId,
        status: 'ISSUED',
        items: {
          create: dto.items.map(item => ({
            sku: item.sku,
            requestedQty: item.requestedQty,
            unitPrice: item.unitPrice
          }))
        }
      },
      include: { items: true }
    });
  }

  async getPurchaseOrders() {
    return this.prisma.purchaseOrder.findMany({
      include: { items: true, warehouse: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createGrn(dto: CreateGrnDto) {
    return this.prisma.$transaction(async (prisma) => {
      const po = await prisma.purchaseOrder.findUnique({
        where: { id: dto.purchaseOrderId },
        include: { items: true }
      });

      if (!po) throw new NotFoundException('Purchase Order not found');

      const grn = await prisma.goodsReceivedNote.create({
        data: {
          purchaseOrderId: dto.purchaseOrderId,
          items: {
            create: dto.items.map(item => ({
              sku: item.sku,
              receivedQty: item.receivedQty,
              acceptedQty: item.acceptedQty,
              rejectedQty: item.rejectedQty,
              reason: item.reason
            }))
          }
        },
        include: { items: true }
      });

      // Update PO Status
      await prisma.purchaseOrder.update({
        where: { id: dto.purchaseOrderId },
        data: { status: 'RECEIVED' }
      });

      // Add to inventory stock and stock movements for accepted quantities
      for (const item of dto.items) {
        if (item.acceptedQty > 0) {
          // Increase stock
          await prisma.inventoryStock.upsert({
            where: {
              warehouseId_sku: {
                warehouseId: po.warehouseId,
                sku: item.sku
              }
            },
            update: {
              quantity: { increment: item.acceptedQty }
            },
            create: {
              warehouseId: po.warehouseId,
              sku: item.sku,
              quantity: item.acceptedQty
            }
          });

          // Record movement
          await prisma.stockMovement.create({
            data: {
              warehouseId: po.warehouseId,
              sku: item.sku,
              type: 'IN',
              quantity: item.acceptedQty,
              reference: `GRN-${grn.id}`
            }
          });
        }
      }

      return grn;
    });
  }

  async generatePickList(dto: GeneratePickListDto) {
    const orders = await this.prisma.order.findMany({
      where: { id: { in: dto.orderIds }, status: 'PLACED' },
      include: { items: true },
    });

    if (orders.length === 0) {
      throw new BadRequestException('No eligible orders found for pick-list generation.');
    }

    // Aggregate items by SKU for warehouse staff
    const pickList = new Map<string, number>();
    for (const order of orders) {
      for (const item of order.items) {
        pickList.set(item.sku, (pickList.get(item.sku) || 0) + item.quantity);
      }
    }

    // In a real system we would create a PickList entity, but for now we'll just return the aggregation
    return {
      orderIds: orders.map(o => o.id),
      aggregatedItems: Array.from(pickList.entries()).map(([sku, quantity]) => ({ sku, quantity })),
    };
  }

  async getBins(warehouseId?: string) {
    return this.prisma.warehouseBin.findMany({
      where: warehouseId ? { warehouseId } : undefined,
      include: { warehouse: true, stocks: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createBin(dto: { warehouseId: string, code: string, description?: string }) {
    return this.prisma.warehouseBin.create({
      data: {
        warehouseId: dto.warehouseId,
        code: dto.code,
        description: dto.description
      },
      include: { warehouse: true }
    });
  }

  async verifyBarcodeScan(dto: BarcodeScanDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundException('Order not found');

    const item = order.items.find(i => i.sku === dto.barcode);
    if (!item) {
      return { success: false, message: `SKU ${dto.barcode} does not belong to Order ${dto.orderId}` };
    }

    return { success: true, message: `SKU ${dto.barcode} verified for Order ${dto.orderId}` };
  }
}
