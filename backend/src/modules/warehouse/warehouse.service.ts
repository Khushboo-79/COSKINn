import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { GeneratePickListDto, BarcodeScanDto } from './dto/warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService
  ) {}

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
