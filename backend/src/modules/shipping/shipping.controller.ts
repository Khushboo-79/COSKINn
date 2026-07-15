import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ServiceabilityCheckDto, CreateShipmentDto } from './dto/shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('serviceability')
  checkServiceability(@Body() dto: ServiceabilityCheckDto) {
    return this.shippingService.checkServiceability(dto);
  }

  @Post('shipments')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER')
  createShipment(@Body() dto: CreateShipmentDto, @Request() req) {
    return this.shippingService.createShipment(dto, req.user.id);
  }

  @Get('orders/:orderId')
  @UseGuards(JwtAuthGuard)
  getOrderShipments(@Param('orderId') orderId: string) {
    return this.shippingService.getOrderShipments(orderId);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager')
  getAllShipments() {
    return this.shippingService.getAllShipments();
  }
}
