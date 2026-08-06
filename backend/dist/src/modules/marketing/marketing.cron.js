"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MarketingCron_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketingCron = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
let MarketingCron = MarketingCron_1 = class MarketingCron {
    prisma;
    notificationService;
    logger = new common_1.Logger(MarketingCron_1.name);
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
    }
    async recoverAbandonedCarts() {
        this.logger.log('Running Scheduled Task: Checking for abandoned carts...');
        try {
            const twentyFourHoursAgo = new Date();
            twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
            const existingLogs = await this.prisma.abandonedCartLog.findMany({
                select: { cartId: true },
            });
            const loggedCartIds = existingLogs.map((l) => l.cartId);
            const abandonedCarts = await this.prisma.cart.findMany({
                where: {
                    updatedAt: { lte: twentyFourHoursAgo },
                    userId: { not: null },
                    items: { some: {} },
                    id: { notIn: loggedCartIds },
                },
                include: { user: true },
            });
            if (abandonedCarts.length > 0) {
                this.logger.log(`Found ${abandonedCarts.length} abandoned cart(s). Sending recovery notifications.`);
                for (const cart of abandonedCarts) {
                    await this.prisma.abandonedCartLog.create({
                        data: {
                            userId: cart.userId,
                            cartId: cart.id,
                        },
                    });
                    await this.notificationService.sendPushNotification(cart.userId, 'You left something behind!', 'Your items are waiting for you in your cart. Checkout now before they sell out!', undefined);
                }
            }
        }
        catch (error) {
            this.logger.error(`Error recovering abandoned carts: ${error.message || error}`);
        }
    }
    async executeScheduledCampaigns() {
        this.logger.debug('Running Scheduled Task: Executing marketing campaigns...');
        try {
            const now = new Date();
            const pendingCampaigns = await this.prisma.marketingCampaign.findMany({
                where: {
                    status: 'SCHEDULED',
                    scheduledAt: { lte: now },
                },
            });
            if (pendingCampaigns.length > 0) {
                this.logger.log(`Found ${pendingCampaigns.length} campaigns to execute.`);
                for (const campaign of pendingCampaigns) {
                    this.logger.log(`Executing Campaign ID ${campaign.id}: "${campaign.name}" via ${campaign.type} to ${campaign.targetSegment}`);
                    await this.notificationService.sendPushNotification('TARGET_SEGMENT', campaign.name, `Special offers for ${campaign.targetSegment}! Tap to see.`, undefined);
                    await this.prisma.marketingCampaign.update({
                        where: { id: campaign.id },
                        data: { status: 'SENT' },
                    });
                }
            }
        }
        catch (error) {
            this.logger.error(`Error executing scheduled campaigns: ${error.message || error}`);
        }
    }
};
exports.MarketingCron = MarketingCron;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketingCron.prototype, "recoverAbandonedCarts", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MarketingCron.prototype, "executeScheduledCampaigns", null);
exports.MarketingCron = MarketingCron = MarketingCron_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], MarketingCron);
//# sourceMappingURL=marketing.cron.js.map