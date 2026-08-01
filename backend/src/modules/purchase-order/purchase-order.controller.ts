import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PurchaseOrderService } from './purchase-order.service';
import { CreatePurchaseOrderDto, CreateGrnDto } from './dto/purchase-order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('purchase-orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PurchaseOrderController {
  constructor(private readonly purchaseOrderService: PurchaseOrderService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  create(@Body() dto: CreatePurchaseOrderDto) {
    return this.purchaseOrderService.create(dto);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  findAll() {
    return this.purchaseOrderService.findAll();
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  findOne(@Param('id') id: string) {
    return this.purchaseOrderService.findOne(id);
  }

  @Post(':id/grn')
  @Roles('SUPER_ADMIN', 'INVENTORY_STAFF', 'WAREHOUSE_STAFF')
  createGrn(@Param('id') id: string, @Body() dto: Omit<CreateGrnDto, 'purchaseOrderId'>) {
    return this.purchaseOrderService.createGrn({ ...dto, purchaseOrderId: id });
  }
}
