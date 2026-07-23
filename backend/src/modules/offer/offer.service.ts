import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OfferService {
  constructor(private prisma: PrismaService) {}

  async evaluateBestOffer(cartItems: any[], cartTotal: number) {
    const activeOffers = await this.prisma.offer.findMany({
      where: { isActive: true },
      include: { rules: true }
    });

    let bestDiscount = 0;
    let appliedOffer: any = null;

    for (const offer of activeOffers) {
      let isEligible = true;

      // Evaluate rules
      for (const rule of offer.rules) {
        if (rule.ruleType === 'MIN_CART_VALUE') {
          if (cartTotal < parseFloat(rule.ruleValue)) {
            isEligible = false;
            break;
          }
        }
        // Additional rules (CATEGORY, PRODUCT) can be implemented here
      }

      if (isEligible) {
        let currentDiscount = 0;
        if (offer.discountAmt) {
          currentDiscount = offer.discountAmt;
        } else if (offer.discountPct) {
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

  async getTieredOfferProgress(cartTotal: number) {
    const activeOffers = await this.prisma.offer.findMany({
      where: { isActive: true },
      include: { rules: true }
    });

    const milestones: any[] = [];

    for (const offer of activeOffers) {
      const minCartRule = offer.rules.find(r => r.ruleType === 'MIN_CART_VALUE');
      if (minCartRule) {
        const targetAmount = parseFloat(minCartRule.ruleValue);
        let reward = '';
        if (offer.discountAmt) {
          reward = `Flat ₹${offer.discountAmt} Off`;
        } else if (offer.discountPct) {
          reward = `Flat ${offer.discountPct}% Off`;
        } else if (offer.title.toLowerCase().includes('free gift') || offer.description?.toLowerCase().includes('free gift')) {
          reward = 'Free Gift';
        } else {
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

    // Sort milestones by targetAmount ascending
    return milestones.sort((a, b) => a.targetAmount - b.targetAmount);
  }
}
