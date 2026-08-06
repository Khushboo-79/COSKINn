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
exports.CouponService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CouponService = class CouponService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async applyCoupon(userId, code) {
        const coupon = await this.prisma.coupon.findUnique({ where: { code } });
        if (!coupon)
            throw new common_1.NotFoundException('Invalid coupon code');
        if (coupon.isActive === false)
            throw new common_1.BadRequestException('Coupon is inactive');
        if (coupon.endDate && new Date() > coupon.endDate)
            throw new common_1.BadRequestException('Coupon expired');
        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit)
            throw new common_1.BadRequestException('Coupon limit reached');
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } },
        });
        if (!cart || cart.items.length === 0)
            throw new common_1.BadRequestException('Cart is empty');
        const cartTotal = cart.items.reduce((acc, item) => {
            const price = Number(item.product.discountPrice || item.product.mrp);
            return acc + price * item.quantity;
        }, 0);
        if (coupon.minPurchase && cartTotal < coupon.minPurchase) {
            throw new common_1.BadRequestException(`Minimum purchase of ${coupon.minPurchase} required`);
        }
        let discountAmount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = cartTotal * (coupon.discountValue / 100);
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
                discountAmount = coupon.maxDiscount;
            }
        }
        else {
            discountAmount = coupon.discountValue;
        }
        return {
            message: 'Coupon applied successfully',
            code: coupon.code,
            discountAmount,
            newTotal: cartTotal - discountAmount,
        };
    }
    async getAvailableCoupons(userId) {
        const now = new Date();
        return this.prisma.coupon.findMany({
            where: {
                isActive: true,
                OR: [{ endDate: null }, { endDate: { gt: now } }],
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async createCoupon(data) {
        return this.prisma.coupon.create({ data });
    }
    async getAdminCoupons() {
        return this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async updateCoupon(id, data) {
        const coupon = await this.prisma.coupon.findUnique({ where: { id } });
        if (!coupon)
            throw new common_1.NotFoundException('Coupon not found');
        return this.prisma.coupon.update({
            where: { id },
            data,
        });
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CouponService);
//# sourceMappingURL=coupon.service.js.map