import { Controller, Post, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
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
}
