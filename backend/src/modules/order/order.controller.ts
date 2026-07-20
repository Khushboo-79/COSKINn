import { Controller, Post, Body, UseGuards, Request, BadRequestException, Get, Put, Param, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { InvoiceService } from '../invoice/invoice.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller()
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly invoiceService: InvoiceService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async createOrder(
    @Request() req,
    @Body('addressId') addressId: string,
    @Body('paymentMode') paymentMode: string = 'ONLINE',
    @Body('pointsToRedeem') pointsToRedeem: number = 0,
    @Body('couponCode') couponCode?: string,
    @Body('useWalletBalance') useWalletBalance: boolean = false
  ) {
    if (!addressId) {
      throw new BadRequestException('addressId is required to create an order');
    }

    if (!['ONLINE', 'COD'].includes(paymentMode)) {
      throw new BadRequestException('paymentMode must be ONLINE or COD');
    }

    return this.orderService.createOrderFromCart(
      req.user.id, 
      addressId, 
      paymentMode, 
      pointsToRedeem,
      couponCode,
      useWalletBalance
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getCustomerOrders(@Request() req) {
    return this.orderService.getCustomerOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders/:id/invoice')
  async getCustomerOrderInvoice(@Request() req, @Param('id') id: string) {
    // Basic authorization check could be added inside service or here
    return this.invoiceService.generateGstInvoice(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders/:id/cancel')
  async cancelOrder(
    @Request() req,
    @Param('id') id: string,
    @Body('reason') reason: string
  ) {
    if (!reason) {
      throw new BadRequestException('Cancellation reason is required');
    }
    return this.orderService.cancelOrder(id, req.user.id, reason);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@Request() req) {
    return this.orderService.getOrders(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders/:id')
  async getOrderById(@Request() req, @Param('id') id: string) {
    return this.orderService.getOrderByIdForCustomer(req.user.id, id);
  }

  // --- ADMIN ENDPOINTS ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Get('admin/orders')
  async getAdminOrders(
    @Query('status') status?: string,
    @Query('paymentMode') paymentMode?: string,
    @Query('email') email?: string,
    @Query('mobile') mobile?: string,
    @Query('platform') platform?: 'COSMETICS' | 'SKINCARE'
  ) {
    return this.orderService.getAdminOrders({ status, paymentMode, email, mobile, platform });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Get('admin/orders/:id')
  async getAdminOrderById(@Param('id') id: string) {
    return this.orderService.getAdminOrderById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Get('admin/orders/:id/invoice')
  async getAdminOrderInvoice(@Param('id') id: string) {
    const invoice = await this.invoiceService.generateGstInvoice(id);
    return invoice;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Put('admin/orders/:id/status')
  async updateOrderStatus(
    @Request() req,
    @Param('id') id: string,
    @Body('status') status: string,
    @Body('notes') notes?: string
  ) {
    return this.orderService.updateOrderStatus(id, status, req.user.id, notes);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Post('admin/orders/:id/cancel')
  async adminCancelOrder(
    @Request() req,
    @Param('id') id: string,
    @Body('reason') reason: string
  ) {
    if (!reason) {
      throw new BadRequestException('Cancellation reason is required');
    }
    return this.orderService.adminCancelOrder(id, req.user.id, reason);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Get('admin/orders/config/cancellations')
  async getCancellations() {
    return this.orderService.getCancellations();
  }

  // --- SETTINGS ENDPOINTS ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Get('admin/orders/settings/config')
  async getSettings() {
    return this.orderService.getSettings();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'order-manager', 'SUPER_ADMIN')
  @Put('admin/orders/settings/config')
  async updateSettings(@Body() body: any) {
    return this.orderService.updateSettings({
      returnWindowDays: body.returnWindowDays,
      autoCancelHours: body.autoCancelHours,
      codEnabled: body.codEnabled,
      maxCodAmount: body.maxCodAmount
    });
  }
}
