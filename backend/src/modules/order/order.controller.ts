import { Controller, Post, Body, UseGuards, Request, BadRequestException, Get, Put, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async createOrder(
    @Request() req,
    @Body('addressId') addressId: string,
    @Body('paymentMode') paymentMode: string = 'ONLINE'
  ) {
    if (!addressId) {
      throw new BadRequestException('addressId is required to create an order');
    }

    if (!['ONLINE', 'COD'].includes(paymentMode)) {
      throw new BadRequestException('paymentMode must be ONLINE or COD');
    }

    return this.orderService.createOrderFromCart(req.user.id, addressId, paymentMode);
  }

  // --- ADMIN ENDPOINTS ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager')
  @Get('admin/orders')
  async getAdminOrders(
    @Query('status') status?: string,
    @Query('paymentMode') paymentMode?: string,
    @Query('email') email?: string,
    @Query('mobile') mobile?: string
  ) {
    return this.orderService.getAdminOrders({ status, paymentMode, email, mobile });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager')
  @Put('admin/orders/:id/status')
  async updateOrderStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('notes') notes?: string
  ) {
    return this.orderService.updateOrderStatus(id, status, req.user.id, notes);
  }
}
