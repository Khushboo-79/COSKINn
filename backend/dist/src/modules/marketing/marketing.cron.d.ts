import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class MarketingCron {
    private readonly prisma;
    private readonly notificationService;
    private readonly logger;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    recoverAbandonedCarts(): Promise<void>;
    executeScheduledCampaigns(): Promise<void>;
}
