import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { GeneratePickListDto, BarcodeScanDto } from './dto/warehouse.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('warehouse')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

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
