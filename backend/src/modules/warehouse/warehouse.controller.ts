import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('warehouse')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get('purchase-orders')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER')
  getPurchaseOrders() {
    return this.warehouseService.getPurchaseOrders();
  }

  @Post('purchase-orders')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER')
  createPurchaseOrder(@Body() dto: CreatePurchaseOrderDto) {
    return this.warehouseService.createPurchaseOrder(dto);
  }

  @Get('bins')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER')
  getBins() {
    // In a real app we might pass warehouseId from query
    return this.warehouseService.getBins();
  }

  @Post('bins')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_MANAGER')
  createBin(@Body() dto: { warehouseId: string, code: string, description?: string }) {
    return this.warehouseService.createBin(dto);
  }

  @Post('grn')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER')
  createGrn(@Body() dto: CreateGrnDto) {
    return this.warehouseService.createGrn(dto);
  }

  @Post('pick-list')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'ORDER_MANAGER')
  generatePickList(@Body() dto: GeneratePickListDto) {
    return this.warehouseService.generatePickList(dto);
  }

  @Post('scan')
  @Roles('SUPER_ADMIN', 'WAREHOUSE_STAFF')
  verifyBarcodeScan(@Body() dto: BarcodeScanDto) {
    return this.warehouseService.verifyBarcodeScan(dto);
  }
}
