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
var RewardPointService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardPointService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let RewardPointService = RewardPointService_1 = class RewardPointService {
    prisma;
    logger = new common_1.Logger(RewardPointService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getBalance(userId) {
        const agg = await this.prisma.rewardPointsLedger.aggregate({
            _sum: { points: true },
            where: { userId },
        });
        return agg._sum.points || 0;
    }
    async getMyLedger(userId) {
        return this.prisma.rewardPointsLedger.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAdminLedger() {
        return this.prisma.rewardPointsLedger.findMany({
            include: { user: { select: { id: true, firstName: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async earnPoints(userId, amountSpent, orderId) {
        const pointsToEarn = Math.floor(amountSpent / 100);
        if (pointsToEarn <= 0)
            return;
        await this.prisma.rewardPointsLedger.create({
            data: {
                userId,
                points: pointsToEarn,
                type: 'EARN',
                reference: `Earned from Order ${orderId}`,
            },
        });
        this.logger.log(`Awarded ${pointsToEarn} points to user ${userId}`);
    }
    async redeemPoints(userId, pointsToRedeem, orderId) {
        const currentBalance = await this.getBalance(userId);
        if (currentBalance < pointsToRedeem) {
            throw new common_1.BadRequestException('Insufficient reward points');
        }
        await this.prisma.rewardPointsLedger.create({
            data: {
                userId,
                points: -pointsToRedeem,
                type: 'REDEEM',
                reference: `Redeemed on Order ${orderId}`,
            },
        });
        return { success: true, redeemedPoints: pointsToRedeem };
    }
};
exports.RewardPointService = RewardPointService;
exports.RewardPointService = RewardPointService = RewardPointService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RewardPointService);
//# sourceMappingURL=reward-point.service.js.map