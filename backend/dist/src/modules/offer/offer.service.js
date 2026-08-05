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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let OfferService = class OfferService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async evaluateBestOffer(cartItems, cartTotal) {
        const activeOffers = await this.prisma.offer.findMany({
            where: { isActive: true },
            include: { rules: true }
        });
        let bestDiscount = 0;
        let appliedOffer = null;
        for (const offer of activeOffers) {
            let isEligible = true;
            for (const rule of offer.rules) {
                if (rule.ruleType === 'MIN_CART_VALUE') {
                    if (cartTotal < parseFloat(rule.ruleValue)) {
                        isEligible = false;
                        break;
                    }
                }
            }
            if (isEligible) {
                let currentDiscount = 0;
                if (offer.discountAmt) {
                    currentDiscount = offer.discountAmt;
                }
                else if (offer.discountPct) {
                    currentDiscount = cartTotal * (offer.discountPct / 100);
                }
                if (currentDiscount > bestDiscount) {
                    bestDiscount = currentDiscount;
                    appliedOffer = offer;
                }
            }
        }
        return {
            discount: Math.min(bestDiscount, cartTotal),
            offer: appliedOffer
        };
    }
    async getTieredOfferProgress(cartTotal) {
        const activeOffers = await this.prisma.offer.findMany({
            where: { isActive: true },
            include: { rules: true }
        });
        const milestones = [];
        for (const offer of activeOffers) {
            const minCartRule = offer.rules.find(r => r.ruleType === 'MIN_CART_VALUE');
            if (minCartRule) {
                const targetAmount = parseFloat(minCartRule.ruleValue);
                let reward = '';
                if (offer.discountAmt) {
                    reward = `Flat ₹${offer.discountAmt} Off`;
                }
                else if (offer.discountPct) {
                    reward = `Flat ${offer.discountPct}% Off`;
                }
                else if (offer.title.toLowerCase().includes('free gift') || offer.description?.toLowerCase().includes('free gift')) {
                    reward = 'Free Gift';
                }
                else {
                    reward = offer.title;
                }
                milestones.push({
                    targetAmount,
                    currentAmount: cartTotal,
                    isAchieved: cartTotal >= targetAmount,
                    reward,
                    offer
                });
            }
        }
        return milestones.sort((a, b) => a.targetAmount - b.targetAmount);
    }
};
exports.OfferService = OfferService;
exports.OfferService = OfferService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OfferService);
//# sourceMappingURL=offer.service.js.map