import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import {
  GeneratePickListDto,
  BarcodeScanDto,
  CreatePurchaseOrderDto,
  CreateGrnDto,
} from './dto/warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService,
  ) {}

  async createPurchaseOrder(dto: CreatePurchaseOrderDto) {
    if (dto.vendorId) {
      // Ensure the supplier exists before linking, to prevent foreign key errors
      await this.prisma.supplier.upsert({
        where: { id: dto.vendorId },
        update: {},
        create: { id: dto.vendorId, name: dto.vendorId },
      });
    }

    return this.prisma.purchaseOrder.create({
      data: {
        warehouseId: dto.warehouseId,
        supplierId: dto.vendorId, // Map vendorId to supplierId
        status: 'ISSUED',
        items: {
          create: dto.items.map((item) => ({
            sku: item.sku,
            requestedQty: item.requestedQty,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: { items: true, supplier: true },
    });
  }

  async getPurchaseOrders() {
    return this.prisma.purchaseOrder.findMany({
      include: { items: true, warehouse: true, supplier: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createGrn(dto: CreateGrnDto) {
    return this.prisma.$transaction(async (prisma) => {
      const po = await prisma.purchaseOrder.findUnique({
        where: { id: dto.purchaseOrderId },
        include: { items: true },
      });

      if (!po) throw new NotFoundException('Purchase Order not found');

      const grn = await prisma.goodsReceivedNote.create({
        data: {
          purchaseOrderId: dto.purchaseOrderId,
          items: {
            create: dto.items.map((item) => ({
              sku: item.sku,
              receivedQty: item.receivedQty,
              acceptedQty: item.acceptedQty,
              rejectedQty: item.rejectedQty,
              reason: item.reason,
            })),
          },
        },
        include: { items: true },
      });

      // Update PO Status
      await prisma.purchaseOrder.update({
        where: { id: dto.purchaseOrderId },
        data: { status: 'RECEIVED' },
      });

      // Add to inventory stock and stock movements for accepted quantities
      for (const item of dto.items) {
        if (item.acceptedQty > 0) {
          // Increase stock
          await prisma.inventoryStock.upsert({
            where: {
              warehouseId_sku: {
                warehouseId: po.warehouseId,
                sku: item.sku,
              },
            },
            update: {
              quantity: { increment: item.acceptedQty },
            },
            create: {
              warehouseId: po.warehouseId,
              sku: item.sku,
              quantity: item.acceptedQty,
            },
          });

          // Record movement
          await prisma.stockMovement.create({
            data: {
              warehouseId: po.warehouseId,
              sku: item.sku,
              type: 'IN',
              quantity: item.acceptedQty,
              reference: `GRN-${grn.id}`,
            },
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
      throw new BadRequestException(
        'No eligible orders found for pick-list generation.',
      );
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
      orderIds: orders.map((o) => o.id),
      aggregatedItems: Array.from(pickList.entries()).map(
        ([sku, quantity]) => ({ sku, quantity }),
      ),
    };
  }

  async getBins(warehouseId?: string) {
    return this.prisma.warehouseBin.findMany({
      where: warehouseId ? { warehouseId } : undefined,
      include: { warehouse: true, stocks: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createBin(dto: {
    warehouseId: string;
    code: string;
    description?: string;
  }) {
    // Ensure warehouse exists for MVP
    await this.prisma.warehouse.upsert({
      where: { id: dto.warehouseId },
      create: {
        id: dto.warehouseId,
        name: 'Main Fulfillment Center',
        code: 'MAIN',
        isActive: true,
      },
      update: {},
    });

    return this.prisma.warehouseBin.create({
      data: {
        warehouseId: dto.warehouseId,
        code: dto.code,
        description: dto.description,
      },
      include: { warehouse: true },
    });
  }

  async verifyBarcodeScan(dto: BarcodeScanDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { items: true },
    });

    if (!order) throw new NotFoundException('Order not found');

    const item = order.items.find((i) => i.sku === dto.barcode);
    if (!item) {
      return {
        success: false,
        message: `SKU ${dto.barcode} does not belong to Order ${dto.orderId}`,
      };
    }

    return {
      success: true,
      message: `SKU ${dto.barcode} verified for Order ${dto.orderId}`,
    };
  }

  async getThroughputAnalytics(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const allIn = await this.prisma.stockMovement.findMany({
      where: { type: 'IN', createdAt: { gte: startDate } },
      select: { createdAt: true, quantity: true },
    });

    const allOut = await this.prisma.stockMovement.findMany({
      where: { type: 'OUT', createdAt: { gte: startDate } },
      select: { createdAt: true, quantity: true },
    });

    const allShipped = await this.prisma.order.findMany({
      where: { status: 'SHIPPED', updatedAt: { gte: startDate } },
      select: { updatedAt: true, items: { select: { quantity: true } } },
    });

    const dataMap = new Map<string, any>();

    // Initialize the last N days with 0
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      // Format as MM-DD for x-axis display
      const displayDate = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      dataMap.set(dateStr, {
        name: displayDate,
        received: 0,
        picked: 0,
        shipped: 0,
        rawDate: dateStr,
      });
    }

    for (const mov of allIn) {
      const dateStr = mov.createdAt.toISOString().split('T')[0];
      if (dataMap.has(dateStr)) {
        dataMap.get(dateStr).received += mov.quantity;
      }
    }

    for (const mov of allOut) {
      const dateStr = mov.createdAt.toISOString().split('T')[0];
      if (dataMap.has(dateStr)) {
        dataMap.get(dateStr).picked += mov.quantity;
      }
    }

    for (const order of allShipped) {
      const dateStr = order.updatedAt.toISOString().split('T')[0];
      if (dataMap.has(dateStr)) {
        const qty = order.items.reduce((acc, item) => acc + item.quantity, 0);
        dataMap.get(dateStr).shipped += qty;
      }
    }

    return Array.from(dataMap.values()).sort((a, b) =>
      a.rawDate.localeCompare(b.rawDate),
    );
  }
}
