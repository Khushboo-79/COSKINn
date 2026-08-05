"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var InventoryCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const inventory_service_1 = require("./inventory.service");
let InventoryCronService = InventoryCronService_1 = class InventoryCronService {
    inventoryService;
    logger = new common_1.Logger(InventoryCronService_1.name);
    constructor(inventoryService) {
        this.inventoryService = inventoryService;
    }
    async handleLowStockAlerts() {
        this.logger.log('Running daily low stock check...');
        const lowStockItems = await this.inventoryService.getLowStock();
        if (lowStockItems.length > 0) {
            this.logger.warn(`Found ${lowStockItems.length} items with low stock.`);
            for (const item of lowStockItems) {
                this.logger.warn(`SKU: ${item.sku} is low (Qty: ${item.quantity}) at Warehouse ID: ${item.warehouseId}`);
            }
        }
        else {
            this.logger.log('No items are low on stock.');
        }
    }
    async handleNearExpiryAlerts() {
        this.logger.log('Running daily near-expiry check...');
        const nearExpiryItems = await this.inventoryService.getNearExpiry();
        if (nearExpiryItems.length > 0) {
            this.logger.warn(`Found ${nearExpiryItems.length} batches nearing expiry.`);
            for (const item of nearExpiryItems) {
                this.logger.warn(`SKU: ${item.sku} Batch: ${item.batchNumber} expires on ${item.expiryDate}`);
            }
        }
        else {
            this.logger.log('No batches are nearing expiry.');
        }
    }
};
exports.InventoryCronService = InventoryCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryCronService.prototype, "handleLowStockAlerts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InventoryCronService.prototype, "handleNearExpiryAlerts", null);
exports.InventoryCronService = InventoryCronService = InventoryCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService])
], InventoryCronService);
//# sourceMappingURL=inventory.cron.js.map