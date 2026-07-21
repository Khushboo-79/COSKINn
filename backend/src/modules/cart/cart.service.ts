import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OfferService } from '../offer/offer.service';
import { WalletService } from '../wallet/wallet.service';
import { RewardPointService } from '../reward-point/reward-point.service';

@Injectable()
export class CartService {
  constructor(
    private prisma: PrismaService,
    private offerService: OfferService,
    private walletService: WalletService,
    private rewardPointService: RewardPointService
  ) {}

  async getCart(userId: string) {
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 }
              }
            }
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
        include: { items: { include: { product: { include: { images: true } } } } }
      });
    }

    // Calculate totals on the fly
    let totalMrp = 0;
    let totalDiscountPrice = 0;
    
    for (const item of cart.items) {
      const price = Number(item.product.discountPrice || item.product.mrp);
      const mrp = Number(item.product.mrp);
      totalMrp += mrp * item.quantity;
      totalDiscountPrice += price * item.quantity;
    }

    const offerData = await this.offerService.evaluateBestOffer(cart.items, totalDiscountPrice);
    
    // Using getWallet returns { balance } object, we just want the balance number
    const wallet = await this.walletService.getWallet(userId);
    const rewardPoints = await this.rewardPointService.getBalance(userId);

    const finalPayable = Math.max(0, totalDiscountPrice - offerData.discount);

    return {
      ...cart,
      summary: {
        totalMrp,
        totalDiscountPrice,
        totalSavings: totalMrp - totalDiscountPrice,
        offerDiscount: offerData.discount,
        appliedOffer: offerData.offer,
        finalTotal: finalPayable, // Excludes shipping for now
        walletBalance: wallet.balance,
        rewardPointsBalance: rewardPoints
      }
    };
  }

  async addToCart(userId: string, productId: string, variantId?: string, quantity: number = 1) {
    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product || product.status !== 'LIVE') {
      throw new NotFoundException('Product not found or not available');
    }

    // Check if item already in cart
    const existingItem = await this.prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId || null
      }
    });

    if (existingItem) {
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity }
      });
    } else {
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId: variantId || null,
          quantity
        }
      });
    }

    return this.getCart(userId);
  }

  async updateCartItem(userId: string, itemId: string, quantity: number) {
    if (quantity < 1) throw new BadRequestException('Quantity must be at least 1');

    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    const item = await this.prisma.cartItem.findFirst({
      where: { id: itemId, cartId: cart.id }
    });

    if (!item) throw new NotFoundException('Item not found in cart');

    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity }
    });

    return this.getCart(userId);
  }

  async removeFromCart(userId: string, itemId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new NotFoundException('Cart not found');

    try {
      await this.prisma.cartItem.delete({
        where: {
          id: itemId,
          cartId: cart.id
        }
      });
    } catch (e) {
      // Ignore if item not found
    }

    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    const cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) return this.getCart(userId);

    await this.prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    });

    return this.getCart(userId);
  }
}
