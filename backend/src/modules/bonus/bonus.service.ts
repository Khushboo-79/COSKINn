import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class BonusService {
  private readonly logger = new Logger(BonusService.name);

  constructor(
    private prisma: PrismaService,
    private walletService: WalletService
  ) {}

  async awardSignupBonus(userId: string) {
    const rule = await this.prisma.bonusRule.findFirst({
      where: { type: 'SIGNUP', isActive: true }
    });

    if (!rule || rule.amount <= 0) return;

    // Ensure it hasn't been given yet via wallet transactions
    const existingBonus = await this.prisma.walletTransaction.findFirst({
      where: {
        wallet: { userId },
        reference: 'Sign-up Bonus'
      }
    });

    if (existingBonus) return; // Already awarded

    await this.walletService.creditWallet(userId, rule.amount, 'Sign-up Bonus');
    this.logger.log(`Awarded signup bonus of ${rule.amount} to user ${userId}`);
  }

  async awardFirstOrderBonus(userId: string) {
    const rule = await this.prisma.bonusRule.findFirst({
      where: { type: 'FIRST_ORDER', isActive: true }
    });

    if (!rule || rule.amount <= 0) return;

    const existingBonus = await this.prisma.walletTransaction.findFirst({
      where: {
        wallet: { userId },
        reference: 'First Order Bonus'
      }
    });

    if (existingBonus) return;

    await this.walletService.creditWallet(userId, rule.amount, 'First Order Bonus');
    this.logger.log(`Awarded first order bonus of ${rule.amount} to user ${userId}`);
  }
}
