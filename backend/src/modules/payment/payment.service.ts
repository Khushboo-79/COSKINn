import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createRazorpayOrder(userId: string, orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId, userId }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status !== 'DRAFT') throw new BadRequestException('Order is already processed');
    if (order.paymentMode !== 'ONLINE') throw new BadRequestException('Order is not marked for ONLINE payment');

    // MOCK RAZORPAY API CALL
    // In production, we would call Razorpay SDK here
    const mockRazorpayOrderId = 'order_mock_' + crypto.randomBytes(8).toString('hex');

    // Save Razorpay order in our DB
    await this.prisma.razorpayOrder.create({
      data: {
        rzpId: mockRazorpayOrderId,
        amount: order.finalAmount,
        receipt: order.id,
        status: 'created'
      }
    });

    return {
      id: mockRazorpayOrderId,
      amount: order.finalAmount * 100, // Amount in paise
      currency: 'INR',
      receipt: order.id
    };
  }

  async handleWebhook(payload: any) {
    // MOCK WEBHOOK HANDLER
    // A real Razorpay webhook contains payload.event (e.g. 'payment.captured')
    // and payload.payload.payment.entity for details.

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
          await tx.order.update({
            where: { id: rzpOrder.receipt },
            data: { status: 'PLACED' }
          });
        }
      });

      return { status: 'success' };
    }

    return { status: 'ignored' };
  }
}
