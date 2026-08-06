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
var ReferralService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const wallet_service_1 = require("../wallet/wallet.service");
let ReferralService = ReferralService_1 = class ReferralService {
    prisma;
    walletService;
    logger = new common_1.Logger(ReferralService_1.name);
    constructor(prisma, walletService) {
        this.prisma = prisma;
        this.walletService = walletService;
    }
    async getOrCreateMyReferralCode(userId) {
        let referral = await this.prisma.referral.findFirst({
            where: { referrerId: userId, refereeId: null },
        });
        if (!referral) {
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();
            referral = await this.prisma.referral.create({
                data: {
                    referrerId: userId,
                    referralCode: code,
                },
            });
        }
        return referral;
    }
    async generateReferralCode(userId) {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        return this.prisma.referral.create({
            data: {
                referrerId: userId,
                referralCode: code,
            },
        });
    }
    async getMyReferrals(userId) {
        return this.prisma.referral.findMany({
            where: { referrerId: userId },
        });
    }
    async getAllReferrals() {
        return this.prisma.referral.findMany({
            include: {
                referrer: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
                referee: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async processReferralSignup(referralCode, newUserId) {
        const referral = await this.prisma.referral.findUnique({
            where: { referralCode },
        });
        if (!referral)
            throw new common_1.NotFoundException('Invalid referral code');
        if (referral.refereeId)
            throw new common_1.BadRequestException('Referral code already used');
        return this.prisma.referral.update({
            where: { id: referral.id },
            data: {
                refereeId: newUserId,
                status: 'CONVERTED',
            },
        });
    }
    async awardReferralBonus(referralId) {
        const referral = await this.prisma.referral.findUnique({
            where: { id: referralId },
        });
        if (!referral || referral.bonusAwarded)
            return;
        const BONUS_AMOUNT = 100;
        await this.walletService.creditWallet(referral.referrerId, BONUS_AMOUNT, 'Referral Bonus');
        if (referral.refereeId) {
            await this.walletService.creditWallet(referral.refereeId, BONUS_AMOUNT, 'Referred Sign-up Bonus');
        }
        await this.prisma.referral.update({
            where: { id: referral.id },
            data: { bonusAwarded: true },
        });
        this.logger.log(`Awarded referral bonuses for referral ${referral.id}`);
    }
};
exports.ReferralService = ReferralService;
exports.ReferralService = ReferralService = ReferralService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wallet_service_1.WalletService])
], ReferralService);
//# sourceMappingURL=referral.service.js.map