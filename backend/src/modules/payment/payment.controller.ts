import { Controller, Post, Body, UseGuards, Request, BadRequestException, Headers } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-order')
  async createRazorpayOrder(
    @Request() req,
    @Body('orderId') orderId: string
  ) {
    if (!orderId) throw new BadRequestException('orderId is required');
    return this.paymentService.createRazorpayOrder(req.user.id, orderId);
  }

  @Post('webhook')
  async razorpayWebhook(@Body() payload: any, @Headers('x-razorpay-signature') signature: string) {
    return this.paymentService.handleWebhook(payload, signature);
  }
}
