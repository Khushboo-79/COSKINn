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
var MembershipService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
let MembershipService = MembershipService_1 = class MembershipService {
    prisma;
    logger = new common_1.Logger(MembershipService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async computeTiersNightly() {
        this.logger.log('Running nightly membership tier computation...');
        const tiers = await this.prisma.membershipTier.findMany({
            orderBy: { minSpend: 'desc' }
        });
        if (tiers.length === 0) {
            this.logger.warn('No membership tiers found in DB');
            return;
        }
        const users = await this.prisma.user.findMany({
            select: { id: true, membershipTierId: true }
        });
        let upgrades = 0;
        for (const user of users) {
            const agg = await this.prisma.order.aggregate({
                _sum: { totalAmount: true },
                where: {
                    userId: user.id,
                    status: 'DELIVERED'
                }
            });
            const lifetimeSpend = agg._sum.totalAmount || 0;
            const eligibleTier = tiers.find(t => lifetimeSpend >= t.minSpend) || tiers[tiers.length - 1];
            if (user.membershipTierId !== eligibleTier.id) {
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
    async getMyTier(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                membershipTier: true
            }
        });
        return {
            tier: user?.membershipTier || null,
            historyUrl: '/api/membership/history'
        };
    }
    async getTiers() {
        return this.prisma.membershipTier.findMany({
            orderBy: { minSpend: 'asc' }
        });
    }
    async createTier(data) {
        return this.prisma.membershipTier.create({
            data
        });
    }
    async updateTier(id, data) {
        return this.prisma.membershipTier.update({
            where: { id },
            data
        });
    }
    async deleteTier(id) {
        return this.prisma.membershipTier.delete({
            where: { id }
        });
    }
};
exports.MembershipService = MembershipService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MembershipService.prototype, "computeTiersNightly", null);
exports.MembershipService = MembershipService = MembershipService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembershipService);
//# sourceMappingURL=membership.service.js.map