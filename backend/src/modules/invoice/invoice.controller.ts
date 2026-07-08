import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id/invoice')
  async getInvoice(@Param('id') orderId: string) {
    return this.invoiceService.generateInvoice(orderId);
  }
}
