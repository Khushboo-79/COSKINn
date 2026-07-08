import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MembershipService {
  private readonly logger = new Logger(MembershipService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async computeTiersNightly() {
    this.logger.log('Running nightly membership tier computation...');
    
    // Fetch all tiers ordered by spend descending
    const tiers = await this.prisma.membershipTier.findMany({
      orderBy: { minSpend: 'desc' }
    });

    if (tiers.length === 0) {
      this.logger.warn('No membership tiers found in DB');
      return;
    }

    // Process in batches (simplified for now to process all)
    const users = await this.prisma.user.findMany({
      select: { id: true, membershipTierId: true }
    });

    let upgrades = 0;

    for (const user of users) {
      // Calculate lifetime spend
      const agg = await this.prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          userId: user.id,
          status: 'DELIVERED'
        }
      });
      const lifetimeSpend = agg._sum.totalAmount || 0;

      // Find eligible tier
      const eligibleTier = tiers.find(t => lifetimeSpend >= t.minSpend) || tiers[tiers.length - 1];

      if (user.membershipTierId !== eligibleTier.id) {
        // Upgrade or Downgrade
        await this.prisma.$transaction(async (tx) => {
          await tx.user.update({
            where: { id: user.id },
            data: { membershipTierId: eligibleTier.id }
          });
          
          await tx.membershipHistory.create({
            data: {
              userId: user.id,
              tierId: eligibleTier.id,
              reason: 'Nightly computation adjustment'
            }
          });
        });
        upgrades++;
      }
    }

    this.logger.log(`Completed tier computation. ${upgrades} users adjusted.`);
  }
}
