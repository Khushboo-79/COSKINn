import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
import * as crypto from 'crypto';
import Razorpay from 'razorpay';

@Injectable()
export class PaymentService {
  private razorpay: any;

  constructor(
    private prisma: PrismaService,
    private notificationService: NotificationService
  ) {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'mock',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock'
    });
  }

  async createRazorpayOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId, userId }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'DRAFT') throw new BadRequestException('Order is already processed');
    if (order.paymentMode !== 'ONLINE') throw new BadRequestException('Order is not marked for ONLINE payment');

    let razorpayOrderId = '';
    try {
      const options = {
        amount: Math.round(order.finalAmount * 100), // amount in smallest currency unit (paise)
        currency: 'INR',
        receipt: order.id
      };
      const rzpOrder = await this.razorpay.orders.create(options);
      razorpayOrderId = rzpOrder.id;
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      throw new BadRequestException('Failed to create payment gateway order');
    }

    // Save Razorpay order in our DB
    await this.prisma.razorpayOrder.create({
      data: {
        rzpId: razorpayOrderId,
        amount: order.finalAmount,
        receipt: order.id,
        status: 'created'
      }
    });

    return {
      id: razorpayOrderId,
      amount: order.finalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: order.id
    };
  }

  async triggerRefund(razorpayOrderId: string, amount: number) {
    try {
      // Fetch all payments for this order
      const payments = await this.razorpay.orders.fetchPayments(razorpayOrderId);
      
      // Find the first successful captured payment to refund against
      const payment = payments.items.find((p: any) => p.status === 'captured');
      
      if (!payment) {
        throw new BadRequestException('No captured payment found for this order to refund');
      }

      // Trigger Refund
      const refund = await this.razorpay.payments.refund(payment.id, {
        amount: Math.round(amount * 100) // Convert to paise
      });

      return {
        success: true,
        refundId: refund.id,
        paymentId: payment.id,
        amount: refund.amount / 100
      };
    } catch (error) {
      console.error('Razorpay refund failed:', error);
      throw new BadRequestException('Failed to process payment gateway refund');
    }
  }

  async handleWebhook(payload: any, signature?: string) {
    // Razorpay Signature Verification
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'mockedwebhooksecret';
    
    // Strict verification using crypto HMAC
    if (signature) {
      const generatedSignature = crypto
        .createHmac('sha256', secret)
        .update(JSON.stringify(payload))
        .digest('hex');

      if (generatedSignature !== signature) {
        throw new BadRequestException('Invalid webhook signature');
      }
    } else {
      throw new BadRequestException('Webhook signature missing');
    }

    const event = payload.event;
    
    if (event === 'payment.captured' || event === 'mock.payment.success') {
      const razorpayOrderId = payload.payload?.payment?.entity?.order_id || payload.order_id;
      
      const rzpOrder = await this.prisma.razorpayOrder.findUnique({
        where: { rzpId: razorpayOrderId }
      });

      if (!rzpOrder) return { status: 'ignored', reason: 'order not found' };

      await this.prisma.$transaction(async (tx) => {
        // Update RazorpayOrder status
        await tx.razorpayOrder.update({
          where: { id: rzpOrder.id },
          data: { status: 'paid' }
        });

        // Record Transaction
        await tx.paymentTransaction.create({
          data: {
            razorpayOrderId: rzpOrder.rzpId,
            amount: rzpOrder.amount,
            status: 'SUCCESS'
          }
        });

        // Mark actual Order as PLACED
        if (rzpOrder.receipt) {
          const updatedOrder = await tx.order.update({
            where: { id: rzpOrder.receipt },
            data: { status: 'PLACED' },
            include: { user: true }
          });
          
          // Send Notification (Fire and forget, shouldn't block the webhook)
          this.notificationService.sendOrderConfirmation(
            updatedOrder.userId, 
            updatedOrder.id, 
            updatedOrder.user?.email || undefined, 
            updatedOrder.user?.phone || undefined
          ).catch(e => console.error('Failed to send order notification', e));
        }
      });

      return { status: 'success' };
    }

    return { status: 'ignored' };
  }
}
