import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Note: auth guard path
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('orders/:id/invoice')
  async getInvoice(@Param('id') orderId: string) {
    return this.invoiceService.generateGstInvoice(orderId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'FINANCE')
  @Post('admin/invoices/:id/credit-note')
  async createCreditNote(
    @Param('id') invoiceId: string,
    @Body('amount') amount: number,
    @Body('reason') reason: string
  ) {
    return this.invoiceService.createCreditNote(invoiceId, amount, reason);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPER_ADMIN', 'FINANCE')
  @Post('admin/invoices/:id/debit-note')
  async createDebitNote(
    @Param('id') invoiceId: string,
    @Body('amount') amount: number,
    @Body('reason') reason: string
  ) {
    return this.invoiceService.createDebitNote(invoiceId, amount, reason);
  }
}

