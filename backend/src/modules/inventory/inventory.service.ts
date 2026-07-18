import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StockMovementDto } from './dto/inventory.dto';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class InventoryService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService
  ) {}

  async getWarehouses() {
    return this.prisma.warehouse.findMany({
      include: {
        bins: true,
      },
    });
  }

  async createWarehouse(dto: any) {
    return this.prisma.warehouse.create({
      data: {
        name: dto.name,
        code: dto.name.toUpperCase().replace(/\s+/g, '-').substring(0, 10) + '-' + Math.floor(Math.random() * 1000),
        address: dto.location || 'Unknown',
        isActive: true
      }
    });
  }

  async getGlobalStock(platform?: 'COSMETICS' | 'SKINCARE') {
    let skuList: string[] | undefined = undefined;

    if (platform) {
      const variants = await this.prisma.productVariant.findMany({
        where: { product: { category: { platform } } },
        select: { sku: true }
      });
      skuList = variants.map(v => v.sku);
    }

    const stocks = await this.prisma.inventoryStock.findMany({
      where: skuList ? { sku: { in: skuList } } : undefined,
      include: {
        warehouse: true,
      },
    });

    // Grouping by SKU for the global stock view
    const globalStockMap = new Map();
    for (const stock of stocks) {
      if (!globalStockMap.has(stock.sku)) {
        globalStockMap.set(stock.sku, {
          sku: stock.sku,
          totalQuantity: 0,
          totalReservedQty: 0,
          warehouses: []
        });
      }
      
      const gStock = globalStockMap.get(stock.sku);
      gStock.totalQuantity += stock.quantity;
      gStock.totalReservedQty += stock.reservedQty;
      gStock.warehouses.push(stock.warehouse.name);
    }

    return Array.from(globalStockMap.values());
  }

  async getStockForSku(sku: string) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { sku },
      include: { product: { include: { bundleItems: true } } }
    });

    if (variant && variant.product && variant.product.bundleItems && variant.product.bundleItems.length > 0) {
      let minAvailable = Infinity;
      for (const item of variant.product.bundleItems) {
        const componentStocks = await this.prisma.inventoryStock.findMany({ where: { sku: item.componentSku } });
        const totalAvail = componentStocks.reduce((sum, s) => sum + s.quantity - s.reservedQty, 0);
        const possibleBundles = Math.floor(totalAvail / item.quantity);
        if (possibleBundles < minAvailable) {
           minAvailable = possibleBundles;
        }
      }
      
      return [{
         id: 'virtual-bundle',
         warehouseId: 'virtual',
         sku,
         quantity: minAvailable === Infinity ? 0 : minAvailable,
         reservedQty: 0,
         createdAt: new Date(),
         updatedAt: new Date(),
         warehouse: { id: 'virtual', name: 'Virtual Bundle Warehouse', code: 'VIRTUAL', address: 'N/A', isActive: true, createdAt: new Date(), updatedAt: new Date() }
      }];
    }

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

      // Log the adjustment to Audit Log
      await this.auditService.logEvent(
        'ADJUST_STOCK',
        'InventoryStock',
        updatedStock.id,
        'SYSTEM',
        { prevQuantity: stock?.quantity || 0 },
        { newQuantity: updatedStock.quantity, reason: dto.reason }
      );

      return { adjustment, stock: updatedStock };
    });
  }

  async getTransfers() {
    return this.prisma.stockTransfer.findMany({
      include: {
        fromWarehouse: true,
        toWarehouse: true,
        items: true
      },
      orderBy: { createdAt: 'desc' }
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
          { warehouseId: dto.fromWarehouseId, sku: dto.sku, type: 'OUT', quantity: dto.quantity, reference: `TRANSFER-TO-${dto.toWarehouseId}` },
          { warehouseId: dto.toWarehouseId, sku: dto.sku, type: 'IN', quantity: dto.quantity, reference: `TRANSFER-FROM-${dto.fromWarehouseId}` },
        ]
      });

      // Create Stock Transfer Record
      const transfer = await prisma.stockTransfer.create({
        data: {
          fromWarehouseId: dto.fromWarehouseId,
          toWarehouseId: dto.toWarehouseId,
          status: 'COMPLETED',
          items: {
            create: [
              { sku: dto.sku, quantity: dto.quantity }
            ]
          }
        }
      });

      return { success: true, message: 'Stock transferred successfully', transfer };
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

  async getDashboardStats() {
    // 1. KPIs
    const uniqueSkusCount = await this.prisma.inventoryStock.groupBy({
      by: ['sku'],
    }).then(res => res.length);

    const stockSum = await this.prisma.inventoryStock.aggregate({
      _sum: { quantity: true }
    });
    const totalInStock = stockSum._sum.quantity || 0;

    const lowStockThreshold = 100;
    const lowStockItems = await this.prisma.inventoryStock.findMany({
      where: { quantity: { gt: 0, lte: lowStockThreshold } },
      select: { sku: true, quantity: true }
    });

    const outOfStockItems = await this.prisma.inventoryStock.findMany({
      where: { quantity: 0 },
      select: { sku: true }
    });

    const pendingPos = await this.prisma.purchaseOrder.count({
      where: { status: { in: ['DRAFT', 'ISSUED'] } }
    });

    // 2. Warehouses
    const warehouses = await this.prisma.warehouse.findMany({
      include: {
        stocks: {
          select: { quantity: true }
        }
      }
    });

    const warehouseSummary = warehouses.map(wh => ({
      id: wh.code,
      name: wh.name,
      items: wh.stocks.reduce((acc, curr) => acc + curr.quantity, 0)
    }));

    // 4. Recent Activity
    const recentActivityRaw = await this.prisma.stockMovement.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    });

    const recentActivity = recentActivityRaw.map(act => ({
      id: act.id,
      name: act.sku,
      desc: `${act.type === 'IN' ? 'Stock In' : act.type === 'OUT' ? 'Stock Out' : 'Transfer'} • ${act.reference || 'Manual'}`,
      qty: act.type === 'IN' ? `+${act.quantity}` : `-${act.quantity}`,
      time: act.createdAt.toISOString(),
      type: act.type.toLowerCase()
    }));

    // 5. Stock Status Donut Data
    const inStockCount = uniqueSkusCount - lowStockItems.length - outOfStockItems.length;
    const stockStatusData = [
      { name: 'In Stock', value: Math.max(0, inStockCount), color: '#f43f5e' },
      { name: 'Low Stock', value: lowStockItems.length, color: '#f59e0b' },
      { name: 'Out of Stock', value: outOfStockItems.length, color: '#ef4444' },
      { name: 'Discontinued', value: 0, color: '#8b5cf6' },
    ];

    return {
      kpis: {
        totalSkus: { value: uniqueSkusCount, trend: '+0 this month', trendUp: true },
        inStock: { value: totalInStock.toLocaleString(), trend: '+0% vs last month', trendUp: true },
        lowStock: { value: lowStockItems.length, trend: '-0 vs last month', trendUp: true },
        outOfStock: { value: outOfStockItems.length, trend: '-0 vs last month', trendUp: true },
        pendingPos: { value: pendingPos, subtext: 'Pending arrival' }
      },
      stockStatusData,
      recentActivity,
      warehouseSummary,
      suppliersData: {
        totalSuppliers: 0,
        openPos: pendingPos,
        goodsInTransit: 0
      }
    };
  }

  async getPurchaseOrders() {
    return this.prisma.purchaseOrder.findMany({
      include: {
        warehouse: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async createPurchaseOrder(dto: { warehouseId: string, status: string }) {
    return this.prisma.purchaseOrder.create({
      data: {
        warehouseId: dto.warehouseId,
        status: dto.status || 'DRAFT'
      }
    });
  }

  async updatePurchaseOrder(id: string, dto: { status: string, items?: { sku: string, quantity: number }[] }) {
    const po = await this.prisma.purchaseOrder.findUnique({ where: { id } });
    if (!po) throw new NotFoundException('PO not found');

    // If status changing to RECEIVED, increment stock (Automatic Stock-in)
    if (po.status !== 'RECEIVED' && dto.status === 'RECEIVED' && dto.items) {
      await this.prisma.$transaction(async (tx) => {
        for (const item of (dto.items || [])) {
          await tx.stockMovement.create({
            data: {
              warehouseId: po.warehouseId,
              sku: item.sku,
              type: 'IN',
              quantity: item.quantity,
              reference: `PO Receipt: ${id}`
            }
          });

          await tx.inventoryStock.upsert({
            where: { warehouseId_sku: { warehouseId: po.warehouseId, sku: item.sku } },
            create: { warehouseId: po.warehouseId, sku: item.sku, quantity: item.quantity, reservedQty: 0 },
            update: { quantity: { increment: item.quantity } }
          });
        }
        await tx.purchaseOrder.update({
          where: { id },
          data: { status: 'RECEIVED' }
        });
      });
      return { success: true, message: 'PO Received and Stock Updated' };
    }

    return this.prisma.purchaseOrder.update({
      where: { id },
      data: { status: dto.status }
    });
  }

  async getReturns() {
    return this.prisma.return.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }
}
