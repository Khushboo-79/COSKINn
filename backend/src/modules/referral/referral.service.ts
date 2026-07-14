import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class ReferralService {
  private readonly logger = new Logger(ReferralService.name);

  constructor(
    private prisma: PrismaService,
    private walletService: WalletService
  ) {}

  async generateReferralCode(userId: string) {
    // Generate a new 6 character alphanumeric code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    return this.prisma.referral.create({
      data: {
        referrerId: userId,
        referralCode: code,
      }
    });
  }

  async getMyReferrals(userId: string) {
    return this.prisma.referral.findMany({
      where: { referrerId: userId }
    });
  }

  async getAllReferrals() {
    return this.prisma.referral.findMany({
      include: {
        referrer: { select: { id: true, firstName: true, lastName: true, email: true } },
        referee: { select: { id: true, firstName: true, lastName: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async processReferralSignup(referralCode: string, newUserId: string) {
    const referral = await this.prisma.referral.findUnique({
      where: { referralCode }
    });

    if (!referral) throw new NotFoundException('Invalid referral code');
    if (referral.refereeId) throw new BadRequestException('Referral code already used');

    // Link the referee
    return this.prisma.referral.update({
      where: { id: referral.id },
      data: {
        refereeId: newUserId,
        status: 'CONVERTED'
      }
    });
  }

  async awardReferralBonus(referralId: string) {
    const referral = await this.prisma.referral.findUnique({
      where: { id: referralId }
    });

    if (!referral || referral.bonusAwarded) return;

    // Hardcode ₹100 bonus for both for now, or fetch from a rule
    const BONUS_AMOUNT = 100;

    await this.walletService.creditWallet(referral.referrerId, BONUS_AMOUNT, 'Referral Bonus');
    if (referral.refereeId) {
      await this.walletService.creditWallet(referral.refereeId, BONUS_AMOUNT, 'Referred Sign-up Bonus');
    }

    await this.prisma.referral.update({
      where: { id: referral.id },
      data: { bonusAwarded: true }
    });

    this.logger.log(`Awarded referral bonuses for referral ${referral.id}`);
  }
}
