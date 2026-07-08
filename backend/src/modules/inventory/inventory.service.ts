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

  async stockOut(dto: StockMovementDto) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    return this.prisma.$transaction(async (prisma) => {
      const stock = await prisma.inventoryStock.findUnique({
        where: { warehouseId_sku: { warehouseId: dto.warehouseId, sku: dto.sku } }
      });

      if (!stock || stock.quantity < dto.quantity) {
        throw new BadRequestException(`Insufficient stock for SKU ${dto.sku}`);
      }

      const movement = await prisma.stockMovement.create({
        data: {
          warehouseId: dto.warehouseId,
          sku: dto.sku,
          type: 'OUT',
          quantity: dto.quantity,
          reference: dto.reference || 'Manual Stock Out',
        },
      });

      const updatedStock = await prisma.inventoryStock.update({
        where: { id: stock.id },
        data: { quantity: { decrement: dto.quantity } },
      });

      return { movement, stock: updatedStock };
    });
  }

  async adjustStock(dto: import('./dto/inventory.dto').StockAdjustmentDto) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: dto.warehouseId },
    });
    
    if (!warehouse) throw new NotFoundException('Warehouse not found');

    return this.prisma.$transaction(async (prisma) => {
      const stock = await prisma.inventoryStock.findUnique({
        where: { warehouseId_sku: { warehouseId: dto.warehouseId, sku: dto.sku } }
      });

      if (dto.quantity < 0 && (!stock || stock.quantity < Math.abs(dto.quantity))) {
        throw new BadRequestException(`Insufficient stock for adjustment of SKU ${dto.sku}`);
      }

      const adjustment = await prisma.stockAdjustment.create({
        data: {
          warehouseId: dto.warehouseId,
          sku: dto.sku,
          quantity: dto.quantity,
          reason: dto.reason,
        },
      });

      const updatedStock = await prisma.inventoryStock.upsert({
        where: { warehouseId_sku: { warehouseId: dto.warehouseId, sku: dto.sku } },
        create: {
          warehouseId: dto.warehouseId,
          sku: dto.sku,
          quantity: Math.max(0, dto.quantity), // Should only be positive if it didn't exist
          reservedQty: 0,
        },
        update: {
          quantity: { increment: dto.quantity },
        },
      });

      return { adjustment, stock: updatedStock };
    });
  }

  async transferStock(dto: import('./dto/inventory.dto').StockTransferDto) {
    return this.prisma.$transaction(async (prisma) => {
      const fromStock = await prisma.inventoryStock.findUnique({
        where: { warehouseId_sku: { warehouseId: dto.fromWarehouseId, sku: dto.sku } }
      });

      if (!fromStock || fromStock.quantity < dto.quantity) {
        throw new BadRequestException(`Insufficient stock in source warehouse`);
      }

      // Decrement from source
      await prisma.inventoryStock.update({
        where: { id: fromStock.id },
        data: { quantity: { decrement: dto.quantity } },
      });

      // Increment to destination
      await prisma.inventoryStock.upsert({
        where: { warehouseId_sku: { warehouseId: dto.toWarehouseId, sku: dto.sku } },
        create: {
          warehouseId: dto.toWarehouseId,
          sku: dto.sku,
          quantity: dto.quantity,
          reservedQty: 0,
        },
        update: {
          quantity: { increment: dto.quantity },
        },
      });

      // Log movements
      await prisma.stockMovement.createMany({
        data: [
          { warehouseId: dto.fromWarehouseId, sku: dto.sku, type: 'OUT', quantity: dto.quantity, reference: `Transfer to ${dto.toWarehouseId}` },
          { warehouseId: dto.toWarehouseId, sku: dto.sku, type: 'IN', quantity: dto.quantity, reference: `Transfer from ${dto.fromWarehouseId}` }
        ]
      });

      return { success: true };
    });
  }

  async reportDamaged(dto: import('./dto/inventory.dto').DamagedStockDto) {
    return this.prisma.damagedStock.create({
      data: {
        sku: dto.sku,
        quantity: dto.quantity,
        reason: dto.reason,
      },
    });
  }

  async reportExpired(dto: import('./dto/inventory.dto').ExpiredStockDto) {
    return this.prisma.expiredStock.create({
      data: {
        sku: dto.sku,
        quantity: dto.quantity,
        batchNo: dto.batchNo,
      },
    });
  }

  async getLowStock() {
    const threshold = 10;
    return this.prisma.inventoryStock.findMany({
      where: { quantity: { lte: threshold } },
      include: { warehouse: true },
    });
  }

  async getNearExpiry() {
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    
    return this.prisma.inventoryBatch.findMany({
      where: { 
        expiryDate: { lte: thirtyDaysFromNow },
      },
    });
  }

  async reserveStock(sku: string, quantity: number, tx: any = this.prisma) {
    const stocks = await tx.inventoryStock.findMany({
      where: { sku, quantity: { gte: quantity } },
      orderBy: { quantity: 'desc' }
    });

    if (stocks.length === 0) {
      throw new BadRequestException(`Insufficient stock to reserve SKU ${sku}`);
    }

    // Just reserve from the first warehouse that has enough stock for now
    const stockToUse = stocks[0];

    return tx.inventoryStock.update({
      where: { id: stockToUse.id },
      data: {
        quantity: { decrement: quantity },
        reservedQty: { increment: quantity }
      }
    });
  }

  async deductReservedStock(sku: string, quantity: number, tx: any = this.prisma) {
    // Find the stock where it's reserved
    const stocks = await tx.inventoryStock.findMany({
      where: { sku, reservedQty: { gte: quantity } }
    });

    if (stocks.length === 0) return; // Silent return or throw error

    const stockToUse = stocks[0];

    return tx.inventoryStock.update({
      where: { id: stockToUse.id },
      data: {
        reservedQty: { decrement: quantity }
        // We don't decrement quantity because it was already decremented during reservation!
      }
    });
  }

  async releaseReservedStock(sku: string, quantity: number, tx: any = this.prisma) {
    const stocks = await tx.inventoryStock.findMany({
      where: { sku, reservedQty: { gte: quantity } }
    });

    if (stocks.length === 0) return;

    const stockToUse = stocks[0];

    return tx.inventoryStock.update({
      where: { id: stockToUse.id },
      data: {
        quantity: { increment: quantity },
        reservedQty: { decrement: quantity }
      }
    });
  }
}
