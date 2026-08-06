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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
const reward_point_service_1 = require("../reward-point/reward-point.service");
const bonus_service_1 = require("../bonus/bonus.service");
const referral_service_1 = require("../referral/referral.service");
const offer_service_1 = require("../offer/offer.service");
const coupon_service_1 = require("../coupon/coupon.service");
const wallet_service_1 = require("../wallet/wallet.service");
let OrderService = class OrderService {
    prisma;
    inventoryService;
    rewardPointService;
    bonusService;
    referralService;
    offerService;
    couponService;
    walletService;
    constructor(prisma, inventoryService, rewardPointService, bonusService, referralService, offerService, couponService, walletService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
        this.rewardPointService = rewardPointService;
        this.bonusService = bonusService;
        this.referralService = referralService;
        this.offerService = offerService;
        this.couponService = couponService;
        this.walletService = walletService;
    }
    async createOrderFromCart(userId, addressId, paymentMode, pointsToRedeem = 0, couponCode, useWalletBalance = false) {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: { product: true },
                },
            },
        });
        if (!cart || cart.items.length === 0) {
            throw new common_1.BadRequestException('Cart is empty');
        }
        const address = await this.prisma.customerAddress.findUnique({
            where: { id: addressId, userId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Delivery address not found');
        }
        let totalAmount = 0;
        let finalAmount = 0;
        const taxAmount = 0;
        const shippingFee = 0;
        cart.items.forEach((item) => {
            const mrp = Number(item.product.mrp);
            const discountPrice = Number(item.product.discountPrice || mrp);
            totalAmount += mrp * item.quantity;
            finalAmount += discountPrice * item.quantity;
        });
        const offerData = await this.offerService.evaluateBestOffer(cart.items, finalAmount);
        finalAmount -= offerData.discount;
        if (finalAmount < 0)
            finalAmount = 0;
        const discountAmt = totalAmount - finalAmount;
        if (pointsToRedeem > 0) {
            const balance = await this.rewardPointService.getBalance(userId);
            if (balance < pointsToRedeem) {
                throw new common_1.BadRequestException('Insufficient reward points');
            }
            finalAmount -= pointsToRedeem;
            if (finalAmount < 0)
                finalAmount = 0;
        }
        let appliedCouponId = null;
        let walletDeduction = 0;
        if (couponCode) {
            const couponResult = await this.couponService.applyCoupon(userId, couponCode);
            finalAmount -= couponResult.discountAmount;
            if (finalAmount < 0)
                finalAmount = 0;
            const coupon = await this.prisma.coupon.findUnique({
                where: { code: couponCode },
            });
            if (coupon)
                appliedCouponId = coupon.id;
        }
        if (useWalletBalance && finalAmount > 0) {
            const wallet = await this.walletService.getWallet(userId);
            if (wallet.balance > 0) {
                walletDeduction = Math.min(wallet.balance, finalAmount);
                finalAmount -= walletDeduction;
            }
        }
        let orderStatus = paymentMode === 'ONLINE' ? 'DRAFT' : 'PLACED';
        if (finalAmount === 0) {
            orderStatus = 'PLACED';
        }
        const orderData = await this.prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    status: orderStatus,
                    totalAmount,
                    discountAmt: totalAmount - finalAmount,
                    taxAmount,
                    shippingFee,
                    finalAmount,
                    paymentMode: finalAmount === 0 ? 'WALLET' : paymentMode,
                    couponId: appliedCouponId,
                    address: {
                        create: {
                            sourceAddressId: address.id,
                            fullName: address.fullName,
                            phone: address.phone,
                            addressLine1: address.addressLine1,
                            addressLine2: address.addressLine2,
                            city: address.city,
                            state: address.state,
                            pincode: address.pincode,
                            country: address.country,
                        },
                    },
                    items: {
                        create: await Promise.all(cart.items.map(async (item) => {
                            const mrp = Number(item.product.mrp);
                            const discountPrice = Number(item.product.discountPrice || mrp);
                            let variantId = item.variantId;
                            let sku = 'UNKNOWN_SKU';
                            let variant = null;
                            if (variantId) {
                                variant = await tx.productVariant.findUnique({
                                    where: { id: variantId },
                                });
                            }
                            else {
                                variant = await tx.productVariant.findFirst({
                                    where: { productId: item.productId },
                                });
                            }
                            if (variant) {
                                variantId = variant.id;
                                sku = variant.sku;
                            }
                            return {
                                variantId: variantId,
                                sku: sku,
                                name: item.product.name,
                                quantity: item.quantity,
                                price: discountPrice,
                                total: discountPrice * item.quantity,
                                taxAmount: 0,
                            };
                        })),
                    },
                },
                include: {
                    address: true,
                    items: true,
                },
            });
            await tx.cartItem.deleteMany({
                where: { cartId: cart.id },
            });
            for (const item of order.items) {
                await this.inventoryService.reserveStock(item.sku, item.quantity, tx);
            }
            if (appliedCouponId) {
                await tx.coupon.update({
                    where: { id: appliedCouponId },
                    data: { usedCount: { increment: 1 } },
                });
            }
            return order;
        });
        if (pointsToRedeem > 0) {
            await this.rewardPointService.redeemPoints(userId, pointsToRedeem, orderData.id);
        }
        if (walletDeduction > 0) {
            await this.walletService.debitWallet(userId, walletDeduction, `Paid for Order ${orderData.id}`);
        }
        return orderData;
    }
    async getOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: { include: { variant: { include: { product: { include: { images: true } } } } } },
                address: true,
                statusHistory: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async trackOrder(orderId, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                statusHistory: { orderBy: { createdAt: 'desc' } },
                shipments: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId)
            throw new common_1.BadRequestException('Not authorized to track this order');
        return {
            status: order.status,
            history: order.statusHistory,
            shipment: order.shipments.length > 0 ? order.shipments[0] : null,
        };
    }
    async getOrderByIdForCustomer(userId, id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                items: { include: { variant: { include: { product: true } } } },
                address: true,
                statusHistory: {
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!order || order.userId !== userId) {
            throw new common_1.NotFoundException('Order not found');
        }
        return order;
    }
    async getAdminOrders(filters) {
        const where = {};
        if (filters.status) {
            if (filters.status === 'PENDING') {
                where.status = { in: ['PLACED', 'PAYMENT_CONFIRMED', 'PROCESSING'] };
            }
            else {
                where.status = filters.status;
            }
        }
        if (filters.paymentMode)
            where.paymentMode = filters.paymentMode;
        if (filters.platform)
            where.platform = filters.platform;
        if (filters.email || filters.mobile) {
            where.user = {};
            if (filters.email)
                where.user.email = { contains: filters.email, mode: 'insensitive' };
            if (filters.mobile)
                where.user.phone = { contains: filters.mobile };
        }
        return this.prisma.order.findMany({
            where,
            include: {
                address: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                items: { include: { variant: { include: { product: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAdminOrderById(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                address: true,
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
                items: { include: { variant: { include: { product: true } } } },
                payments: true,
                shipments: true,
                cancellations: true,
                statusHistory: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async updateOrderStatus(orderId, status, adminId, notes) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const res = await this.prisma.$transaction(async (tx) => {
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status },
            });
            await tx.orderStatusHistory.create({
                data: {
                    orderId,
                    status,
                    notes: notes || `Status updated by Admin ${adminId}`,
                },
            });
            if (status === 'SHIPPED' &&
                order.status !== 'SHIPPED' &&
                order.status !== 'DELIVERED') {
                for (const item of order.items) {
                    await this.inventoryService.deductReservedStock(item.sku, item.quantity, tx);
                }
            }
            return updatedOrder;
        });
        if (status === 'DELIVERED' && order.status !== 'DELIVERED') {
            try {
                await this.rewardPointService.earnPoints(order.userId, order.totalAmount, orderId);
                await this.bonusService.awardFirstOrderBonus(order.userId);
                const referral = await this.prisma.referral.findUnique({
                    where: { refereeId: order.userId },
                });
                if (referral && !referral.bonusAwarded) {
                    await this.referralService.awardReferralBonus(referral.id);
                }
            }
            catch (error) {
                console.error('Error awarding bonuses on delivery:', error);
            }
        }
        return res;
    }
    async adminCancelOrder(orderId, adminId, reason) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status === 'SHIPPED' ||
            order.status === 'DELIVERED' ||
            order.status === 'CANCELLED') {
            throw new common_1.BadRequestException(`Cannot cancel order in ${order.status} state`);
        }
        return this.prisma.$transaction(async (tx) => {
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status: 'CANCELLED' },
            });
            await tx.orderStatusHistory.create({
                data: {
                    orderId,
                    status: 'CANCELLED',
                    notes: `Cancelled by Admin ${adminId}: ${reason}`,
                },
            });
            await tx.orderCancellation.create({
                data: { orderId, reason },
            });
            if (order.status === 'PACKED' || order.status === 'PLACED') {
                for (const item of order.items) {
                    await this.inventoryService.releaseReservedStock(item.sku, item.quantity, tx);
                }
            }
            return updatedOrder;
        });
    }
    async cancelOrder(orderId, userId, reason) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId)
            throw new common_1.BadRequestException('Not authorized to cancel this order');
        if (order.status === 'SHIPPED' ||
            order.status === 'DELIVERED' ||
            order.status === 'CANCELLED') {
            throw new common_1.BadRequestException(`Cannot cancel order in ${order.status} state`);
        }
        return this.prisma.$transaction(async (tx) => {
            const updatedOrder = await tx.order.update({
                where: { id: orderId },
                data: { status: 'CANCELLED' },
            });
            await tx.orderStatusHistory.create({
                data: {
                    orderId,
                    status: 'CANCELLED',
                    notes: `Cancelled by user: ${reason}`,
                },
            });
            await tx.orderCancellation.create({
                data: { orderId, reason },
            });
            for (const item of order.items) {
                await this.inventoryService.releaseReservedStock(item.sku, item.quantity, tx);
            }
            return updatedOrder;
        });
    }
    async getSettings() {
        let settings = await this.prisma.orderSettings.findFirst();
        if (!settings) {
            settings = await this.prisma.orderSettings.create({
                data: {
                    returnWindowDays: 7,
                    autoCancelHours: 24,
                    codEnabled: true,
                    maxCodAmount: 5000,
                },
            });
        }
        return settings;
    }
    async getCancellations() {
        const cancellations = await this.prisma.orderCancellation.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                order: {
                    select: {
                        id: true,
                        totalAmount: true,
                        status: true,
                        user: { select: { email: true } },
                    },
                },
            },
        });
        return cancellations.map((c) => ({
            id: c.id,
            date: c.createdAt.toISOString().split('T')[0],
            orderId: c.orderId.split('-')[0].toUpperCase(),
            customer: c.order.user ? c.order.user.email : 'Guest',
            reason: c.reason,
            refundStatus: c.order.status === 'CANCELLED' ? 'PROCESSED' : 'PENDING',
        }));
    }
    async updateSettings(data) {
        const settings = await this.getSettings();
        return this.prisma.orderSettings.update({
            where: { id: settings.id },
            data,
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService,
        reward_point_service_1.RewardPointService,
        bonus_service_1.BonusService,
        referral_service_1.ReferralService,
        offer_service_1.OfferService,
        coupon_service_1.CouponService,
        wallet_service_1.WalletService])
], OrderService);
//# sourceMappingURL=order.service.js.map