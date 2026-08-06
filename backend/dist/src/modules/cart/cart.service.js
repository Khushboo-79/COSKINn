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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const offer_service_1 = require("../offer/offer.service");
const wallet_service_1 = require("../wallet/wallet.service");
const reward_point_service_1 = require("../reward-point/reward-point.service");
let CartService = class CartService {
    prisma;
    offerService;
    walletService;
    rewardPointService;
    constructor(prisma, offerService, walletService, rewardPointService) {
        this.prisma = prisma;
        this.offerService = offerService;
        this.walletService = walletService;
        this.rewardPointService = rewardPointService;
    }
    async getCart(userId) {
        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: { where: { isPrimary: true }, take: 1 },
                            },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: {
                    items: { include: { product: { include: { images: true } } } },
                },
            });
        }
        let totalMrp = 0;
        let totalDiscountPrice = 0;
        for (const item of cart.items) {
            const price = Number(item.product.discountPrice || item.product.mrp);
            const mrp = Number(item.product.mrp);
            totalMrp += mrp * item.quantity;
            totalDiscountPrice += price * item.quantity;
        }
        const offerData = await this.offerService.evaluateBestOffer(cart.items, totalDiscountPrice);
        const tieredOffers = await this.offerService.getTieredOfferProgress(totalDiscountPrice);
        const autoAddedGifts = [];
        for (const tier of tieredOffers) {
            if (tier.isAchieved && tier.reward === 'Free Gift') {
                autoAddedGifts.push({
                    name: tier.offer?.title || 'Surprise Free Gift',
                    price: 0,
                    quantity: 1,
                    isAutoAdded: true,
                });
            }
        }
        const wallet = await this.walletService.getWallet(userId);
        const rewardPoints = await this.rewardPointService.getBalance(userId);
        const finalPayable = Math.max(0, totalDiscountPrice - offerData.discount);
        return {
            ...cart,
            autoAddedGifts,
            summary: {
                totalMrp,
                totalDiscountPrice,
                totalSavings: totalMrp - totalDiscountPrice,
                offerDiscount: offerData.discount,
                appliedOffer: offerData.offer,
                tieredOffers,
                finalTotal: finalPayable,
                walletBalance: wallet.balance,
                rewardPointsBalance: rewardPoints,
            },
        };
    }
    async addToCart(userId, productId, variantId, quantity = 1) {
        let cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart) {
            cart = await this.prisma.cart.create({ data: { userId } });
        }
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product || product.status !== 'LIVE') {
            throw new common_1.NotFoundException('Product not found or not available');
        }
        const existingItem = await this.prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId,
                variantId: variantId || null,
            },
        });
        if (existingItem) {
            await this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        }
        else {
            await this.prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    variantId: variantId || null,
                    quantity,
                },
            });
        }
        return this.getCart(userId);
    }
    async updateCartItem(userId, itemId, quantity) {
        if (quantity < 1)
            throw new common_1.BadRequestException('Quantity must be at least 1');
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        const item = await this.prisma.cartItem.findFirst({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item)
            throw new common_1.NotFoundException('Item not found in cart');
        await this.prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity },
        });
        return this.getCart(userId);
    }
    async removeFromCart(userId, itemId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            throw new common_1.NotFoundException('Cart not found');
        try {
            await this.prisma.cartItem.delete({
                where: {
                    id: itemId,
                    cartId: cart.id,
                },
            });
        }
        catch (e) {
        }
        return this.getCart(userId);
    }
    async clearCart(userId) {
        const cart = await this.prisma.cart.findUnique({ where: { userId } });
        if (!cart)
            return this.getCart(userId);
        await this.prisma.cartItem.deleteMany({
            where: { cartId: cart.id },
        });
        return this.getCart(userId);
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        offer_service_1.OfferService,
        wallet_service_1.WalletService,
        reward_point_service_1.RewardPointService])
], CartService);
//# sourceMappingURL=cart.service.js.map