import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RewardPointService {
  private readonly logger = new Logger(RewardPointService.name);

  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string) {
    const agg = await this.prisma.rewardPointsLedger.aggregate({
      _sum: { points: true },
      where: { userId }
    });
    return agg._sum.points || 0;
  }

  async earnPoints(userId: string, amountSpent: number, orderId: string) {
    // 1 point per ₹150 spent
    const pointsToEarn = Math.floor(amountSpent / 150);
    if (pointsToEarn <= 0) return;

    await this.prisma.rewardPointsLedger.create({
      data: {
        userId,
        points: pointsToEarn,
        type: 'EARN',
        reference: `Earned from Order ${orderId}`
      }
    });

    this.logger.log(`Awarded ${pointsToEarn} points to user ${userId}`);
  }

  async redeemPoints(userId: string, pointsToRedeem: number, orderId: string) {
    const currentBalance = await this.getBalance(userId);
    if (currentBalance < pointsToRedeem) {
      throw new BadRequestException('Insufficient reward points');
    }

    await this.prisma.rewardPointsLedger.create({
      data: {
        userId,
        points: -pointsToRedeem,
        type: 'REDEEM',
        reference: `Redeemed on Order ${orderId}`
      }
    });

    return { success: true, redeemedPoints: pointsToRedeem };
  }
}
