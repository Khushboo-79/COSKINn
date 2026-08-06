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
exports.MarketingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MarketingService = class MarketingService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getActiveBanners() {
        const now = new Date();
        return this.prisma.banner.findMany({
            where: {
                isActive: true,
                OR: [{ startDate: null }, { startDate: { lte: now } }],
                AND: [{ OR: [{ endDate: null }, { endDate: { gte: now } }] }],
            },
            orderBy: { sortOrder: 'asc' },
        });
    }
    async getBanners() {
        return this.prisma.banner.findMany({
            orderBy: { sortOrder: 'asc' },
        });
    }
    async createBanner(data) {
        return this.prisma.banner.create({
            data,
        });
    }
    async updateBanner(id, data) {
        return this.prisma.banner.update({
            where: { id },
            data,
        });
    }
    async deleteBanner(id) {
        return this.prisma.banner.delete({
            where: { id },
        });
    }
    async getCoupons() {
        return this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async createCoupon(data) {
        const existing = await this.prisma.coupon.findUnique({
            where: { code: data.code },
        });
        if (existing) {
            throw new common_1.ConflictException('Coupon code already exists');
        }
        return this.prisma.coupon.create({
            data,
        });
    }
    async updateCoupon(id, data) {
        if (data.code) {
            const existing = await this.prisma.coupon.findUnique({
                where: { code: data.code },
            });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Coupon code already exists');
            }
        }
        return this.prisma.coupon.update({
            where: { id },
            data,
        });
    }
    async deleteCoupon(id) {
        return this.prisma.coupon.delete({
            where: { id },
        });
    }
    async getCampaigns() {
        return this.prisma.marketingCampaign.findMany();
    }
    async createCampaign(data) {
        return this.prisma.marketingCampaign.create({ data });
    }
    async scheduleCampaign(id, scheduledAt) {
        return this.prisma.marketingCampaign.update({
            where: { id },
            data: { scheduledAt, status: 'SCHEDULED' },
        });
    }
    async logAbandonedCart(userId, cartId) {
        return this.prisma.abandonedCartLog.create({
            data: { userId, cartId },
        });
    }
    async getAbandonedCarts(recovered) {
        const where = recovered !== undefined ? { recovered } : {};
        return this.prisma.abandonedCartLog.findMany({
            where,
            include: { user: true },
        });
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map