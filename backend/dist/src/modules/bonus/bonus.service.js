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
var BonusService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BonusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const wallet_service_1 = require("../wallet/wallet.service");
let BonusService = BonusService_1 = class BonusService {
    prisma;
    walletService;
    logger = new common_1.Logger(BonusService_1.name);
    constructor(prisma, walletService) {
        this.prisma = prisma;
        this.walletService = walletService;
    }
    async awardSignupBonus(userId) {
        const rule = await this.prisma.bonusRule.findFirst({
            where: { type: 'SIGNUP', isActive: true }
        });
        if (!rule || rule.amount <= 0)
            return;
        const existingBonus = await this.prisma.walletTransaction.findFirst({
            where: {
                wallet: { userId },
                reference: 'Sign-up Bonus'
            }
        });
        if (existingBonus)
            return;
        await this.walletService.creditWallet(userId, rule.amount, 'Sign-up Bonus');
        this.logger.log(`Awarded signup bonus of ${rule.amount} to user ${userId}`);
    }
    async awardFirstOrderBonus(userId) {
        const rule = await this.prisma.bonusRule.findFirst({
            where: { type: 'FIRST_ORDER', isActive: true }
        });
        if (!rule || rule.amount <= 0)
            return;
        const existingBonus = await this.prisma.walletTransaction.findFirst({
            where: {
                wallet: { userId },
                reference: 'First Order Bonus'
            }
        });
        if (existingBonus)
            return;
        await this.walletService.creditWallet(userId, rule.amount, 'First Order Bonus');
        this.logger.log(`Awarded first order bonus of ${rule.amount} to user ${userId}`);
    }
};
exports.BonusService = BonusService;
exports.BonusService = BonusService = BonusService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wallet_service_1.WalletService])
], BonusService);
//# sourceMappingURL=bonus.service.js.map