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
  stockIn(@Body() dto: StockMovementDto) {
    return this.inventoryService.stockIn(dto);
  }
}
