import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { ProcessRefundDto } from './dto/refund.dto';

@Injectable()
export class RefundService {
  constructor(
    private prisma: PrismaService,
    private walletService: WalletService
  ) {}

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
      // Mock Razorpay / Original Source refund
      if (order.paymentMode === 'COD') {
        throw new BadRequestException('COD orders can only be refunded to Wallet');
      }

      // 3rd party API call simulation
      const mockRefundId = `RFND${Math.floor(Math.random() * 100000)}`;

      await this.prisma.orderPayment.create({
        data: {
          orderId: order.id,
          status: 'SUCCESS',
          amount: -dto.amount,
          method: 'ORIGINAL_SOURCE_REFUND' // can store mockRefundId in reference/method
        }
      });

      return { success: true, message: `Refund processed to original source. ID: ${mockRefundId}` };
    }
  }
}
