import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { StockMovementDto } from './dto/inventory.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get('warehouses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  getWarehouses() {
    return this.inventoryService.getWarehouses();
  }

  @Post('warehouses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  createWarehouse(@Body() dto: any) {
    return this.inventoryService.createWarehouse(dto);
  }

  @Get('dashboard-stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  getDashboardStats() {
    return this.inventoryService.getDashboardStats();
  }

  @Get('stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF', 'PRODUCT_MANAGER')
  getGlobalStock() {
    return this.inventoryService.getGlobalStock();
  }

  @Get('stock/:sku')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF', 'PRODUCT_MANAGER')
  getStockForSku(@Param('sku') sku: string) {
    return this.inventoryService.getStockForSku(sku);
  }

  @Post('stock-in')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  stockIn(@Body() dto: import('./dto/inventory.dto').StockMovementDto) {
    return this.inventoryService.stockIn(dto);
  }

  @Post('stock-out')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  stockOut(@Body() dto: import('./dto/inventory.dto').StockMovementDto) {
    return this.inventoryService.stockOut(dto);
  }

  @Post('adjustment')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  adjustStock(@Body() dto: import('./dto/inventory.dto').StockAdjustmentDto) {
    return this.inventoryService.adjustStock(dto);
  }

  @Post('transfer')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  transferStock(@Body() dto: import('./dto/inventory.dto').StockTransferDto) {
    return this.inventoryService.transferStock(dto);
  }

  @Post('damaged')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  reportDamaged(@Body() dto: import('./dto/inventory.dto').DamagedStockDto) {
    return this.inventoryService.reportDamaged(dto);
  }

  @Post('expired')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  reportExpired(@Body() dto: import('./dto/inventory.dto').ExpiredStockDto) {
    return this.inventoryService.reportExpired(dto);
  }

  @Get('alerts/low-stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  getLowStock() {
    return this.inventoryService.getLowStock();
  }

  @Get('alerts/near-expiry')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  getNearExpiry() {
    return this.inventoryService.getNearExpiry();
  }

  @Get('purchase-orders')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  getPurchaseOrders() {
    return this.inventoryService.getPurchaseOrders();
  }

  @Get('returns')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF')
  getReturns() {
    return this.inventoryService.getReturns();
  }
}
