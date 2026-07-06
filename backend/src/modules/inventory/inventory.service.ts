import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StockMovementDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getWarehouses() {
    return this.prisma.warehouse.findMany({
      include: {
        bins: true,
      },
    });
  }

  async getGlobalStock() {
    // Returns available stock per SKU per warehouse
    const stocks = await this.prisma.inventoryStock.findMany({
      include: {
        warehouse: true,
      },
    });
    
    // Also fetch damaged and expired stock summaries if needed, but for Day 13 we just need available vs reserved
    return stocks;
  }

  async getStockForSku(sku: string) {
    return this.prisma.inventoryStock.findMany({
      where: { sku },
      include: { warehouse: true }
    });
  }

  async stockIn(dto: StockMovementDto) {
    // Verify Warehouse exists
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    
    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    // Wrap in a transaction to ensure ledger and stock stay in sync
    return this.prisma.$transaction(async (prisma) => {
      // 1. Create the stock movement ledger entry
      const movement = await prisma.stockMovement.create({
        data: {
          warehouseId: dto.warehouseId,
          sku: dto.sku,
          type: 'IN',
          quantity: dto.quantity,
          reference: dto.reference || 'Manual Stock In',
        },
      });

      // 2. Upsert the InventoryStock
      const stock = await prisma.inventoryStock.upsert({
        where: {
          warehouseId_sku: {
            warehouseId: dto.warehouseId,
            sku: dto.sku,
          },
        },
        create: {
          warehouseId: dto.warehouseId,
          sku: dto.sku,
          quantity: dto.quantity,
          reservedQty: 0,
        },
        update: {
          quantity: {
            increment: dto.quantity,
          },
        },
      });

      return { movement, stock };
    });
  }
}
