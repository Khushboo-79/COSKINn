import { Controller, Get, Patch, Post, Param, Query, Body, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string, 
    @Query('search') search?: string
  ) {
    return this.orderService.findAll(Number(page), Number(limit), search, status);
  }

  @Get(':id')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Post()
  checkout(@Request() req: any, @Body() dto: CreateOrderDto) {
    return this.orderService.checkout(req.user.id, dto);
  }

  @Patch(':id/status')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
    return this.orderService.updateStatus(id, dto);
  }

  @Post(':id/cancel')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'CUSTOMER_SUPPORT')
  cancelOrder(@Param('id') id: string, @Body('reason') reason: string) {
    return this.orderService.cancelOrder(id, reason);
  }

  @Get(':id/invoice')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'FINANCE')
  getInvoice(@Param('id') id: string) {
    return this.orderService.getInvoice(id);
  }
}
