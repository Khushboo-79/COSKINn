import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { PaymentService } from '../payment/payment.service';
import { ProcessRefundDto } from './dto/refund.dto';

@Injectable()
export class RefundService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService,
    private paymentService: PaymentService
  ) {}

  async getAllRefunds() {
    return this.prisma.orderPayment.findMany({
      where: { method: { in: ['WALLET_REFUND', 'ORIGINAL_SOURCE_REFUND'] } },
      include: { order: { select: { id: true, user: { select: { email: true, firstName: true } } } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async processRefund(dto: ProcessRefundDto, type: 'WALLET' | 'ORIGINAL_SOURCE') {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { payments: true }
    });

    if (!order) throw new NotFoundException('Order not found');

    if (type === 'WALLET') {
      // Credit to wallet
      await this.walletService.creditWallet(
        order.userId,
        dto.amount,
        `Refund for Order ${order.id}`
      );

      // Create a mock refund record or use Payment model
      await this.prisma.orderPayment.create({
        data: {
          orderId: order.id,
          status: 'SUCCESS',
          amount: -dto.amount, // Negative for refund
          method: 'WALLET_REFUND'
        }
      });
      return { success: true, message: 'Refund credited to wallet' };
    } else {
      // Razorpay / Original Source refund
      if (order.paymentMode === 'COD') {
        throw new BadRequestException('COD orders can only be refunded to Wallet');
      }

      // Fetch Razorpay order ID to refund against
      const rzpOrder = await this.prisma.razorpayOrder.findFirst({
        where: { receipt: order.id, status: 'paid' },
        orderBy: { createdAt: 'desc' }
      });

      if (!rzpOrder) {
        throw new BadRequestException('No successful Razorpay payment found for this order to refund');
      }

      // Trigger Actual Refund via Razorpay API
      const refundResult = await this.paymentService.triggerRefund(rzpOrder.rzpId, dto.amount);

      await this.prisma.orderPayment.create({
        data: {
          orderId: order.id,
          status: 'SUCCESS',
          amount: -dto.amount,
          method: `REFUND_${refundResult.refundId}`
        }
      });

      return { success: true, message: `Refund processed to original source. Refund ID: ${refundResult.refundId}` };
    }
  }
}
