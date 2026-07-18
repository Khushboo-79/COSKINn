import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class MarketingCron {
  private readonly logger = new Logger(MarketingCron.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async recoverAbandonedCarts() {
    this.logger.log('Running Scheduled Task: Checking for abandoned carts...');
    
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    // Find cart IDs that have already been logged
    const existingLogs = await this.prisma.abandonedCartLog.findMany({ select: { cartId: true } });
    const loggedCartIds = existingLogs.map(l => l.cartId);

    // Find carts that haven't been updated in 24 hours, belong to a user, have items, and haven't been logged yet
    const abandonedCarts = await this.prisma.cart.findMany({
      where: {
        updatedAt: { lte: twentyFourHoursAgo },
        userId: { not: null },
        items: { some: {} }, // cart is not empty
        id: { notIn: loggedCartIds } // no AbandonedCartLog exists
      },
      include: { user: true }
    });

    if (abandonedCarts.length > 0) {
      this.logger.log(`Found ${abandonedCarts.length} abandoned cart(s). Sending recovery notifications.`);
      
      for (const cart of abandonedCarts) {
        // Log to database
        await this.prisma.abandonedCartLog.create({
          data: {
            userId: cart.userId!,
            cartId: cart.id
          }
        });

        // Send Push/Email Notification via NotificationService
        await this.notificationService.sendPushNotification(
          cart.userId!,
          'You left something behind!',
          'Your items are waiting for you in your cart. Checkout now before they sell out!',
          undefined
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async executeScheduledCampaigns() {
    this.logger.debug('Running Scheduled Task: Executing marketing campaigns...');

    const now = new Date();

    const pendingCampaigns = await this.prisma.marketingCampaign.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledAt: { lte: now }
      }
    });

    if (pendingCampaigns.length > 0) {
      this.logger.log(`Found ${pendingCampaigns.length} campaigns to execute.`);

      for (const campaign of pendingCampaigns) {
        // Here we would typically find the target users based on 'targetSegment' or 'audience'
        // For MVP, we will simulate sending to a broad segment
        this.logger.log(`Executing Campaign ID ${campaign.id}: "${campaign.name}" via ${campaign.type} to ${campaign.targetSegment}`);

        // Mock sending to a segment
        await this.notificationService.sendPushNotification(
          'TARGET_SEGMENT',
          campaign.name,
          `Special offers for ${campaign.targetSegment}! Tap to see.`,
          undefined
        );

        // Update status to SENT
        await this.prisma.marketingCampaign.update({
          where: { id: campaign.id },
          data: { status: 'SENT' }
        });
      }
    }
  }
}
