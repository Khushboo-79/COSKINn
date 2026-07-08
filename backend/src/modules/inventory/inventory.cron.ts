import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InventoryService } from './inventory.service';

@Injectable()
export class InventoryCronService {
  private readonly logger = new Logger(InventoryCronService.name);

  constructor(private readonly inventoryService: InventoryService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleLowStockAlerts() {
    this.logger.log('Running daily low stock check...');
    const lowStockItems = await this.inventoryService.getLowStock();
    
    if (lowStockItems.length > 0) {
      this.logger.warn(`Found ${lowStockItems.length} items with low stock.`);
      for (const item of lowStockItems) {
        this.logger.warn(`SKU: ${item.sku} is low (Qty: ${item.quantity}) at Warehouse ID: ${item.warehouseId}`);
      }
    } else {
      this.logger.log('No items are low on stock.');
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleNearExpiryAlerts() {
    this.logger.log('Running daily near-expiry check...');
    const nearExpiryItems = await this.inventoryService.getNearExpiry();
    
    if (nearExpiryItems.length > 0) {
      this.logger.warn(`Found ${nearExpiryItems.length} batches nearing expiry.`);
      for (const item of nearExpiryItems) {
        this.logger.warn(`SKU: ${item.sku} Batch: ${item.batchNumber} expires on ${item.expiryDate}`);
      }
    } else {
      this.logger.log('No batches are nearing expiry.');
    }
  }
}
