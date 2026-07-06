import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('order/:orderId')
  @Roles('SUPER_ADMIN', 'ORDER_MANAGER', 'FINANCE', 'CUSTOMER_SUPPORT')
  getOrderPayments(@Param('orderId') orderId: string) {
    return this.paymentService.getOrderPayments(orderId);
  }
}
