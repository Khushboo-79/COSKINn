import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('shipping')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get('order/:orderId')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  getOrderShipments(@Param('orderId') orderId: string) {
    return this.shippingService.getOrderShipments(orderId);
  }
}
