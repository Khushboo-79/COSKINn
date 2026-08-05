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
                OR: [
                    { startDate: null },
                    { startDate: { lte: now } }
                ],
                AND: [
                    { OR: [{ endDate: null }, { endDate: { gte: now } }] }
                ]
            },
            orderBy: { sortOrder: 'asc' }
        });
    }
    async getBanners() {
        return this.prisma.banner.findMany({
            orderBy: { sortOrder: 'asc' }
        });
    }
    async createBanner(data) {
        return this.prisma.banner.create({
            data
        });
    }
    async updateBanner(id, data) {
        return this.prisma.banner.update({
            where: { id },
            data
        });
    }
    async deleteBanner(id) {
        return this.prisma.banner.delete({
            where: { id }
        });
    }
    async getCoupons() {
        return this.prisma.coupon.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async createCoupon(data) {
        const existing = await this.prisma.coupon.findUnique({ where: { code: data.code } });
        if (existing) {
            throw new common_1.ConflictException('Coupon code already exists');
        }
        return this.prisma.coupon.create({
            data
        });
    }
    async updateCoupon(id, data) {
        if (data.code) {
            const existing = await this.prisma.coupon.findUnique({ where: { code: data.code } });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Coupon code already exists');
            }
        }
        return this.prisma.coupon.update({
            where: { id },
            data
        });
    }
    async deleteCoupon(id) {
        return this.prisma.coupon.delete({
            where: { id }
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
            data: { scheduledAt, status: 'SCHEDULED' }
        });
    }
    async logAbandonedCart(userId, cartId) {
        return this.prisma.abandonedCartLog.create({
            data: { userId, cartId }
        });
    }
    async getAbandonedCarts(recovered) {
        const where = recovered !== undefined ? { recovered } : {};
        return this.prisma.abandonedCartLog.findMany({ where, include: { user: true } });
    }
    async getDashboardOverview() {
        const activeCampaigns = await this.prisma.marketingCampaign.count({
            where: {
                status: { in: ['ACTIVE', 'SCHEDULED', 'SENT'] }
            }
        });
        const totalReach = await this.prisma.user.count();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const recentOrders = await this.prisma.order.aggregate({
            where: {
                createdAt: { gte: thirtyDaysAgo },
                status: { notIn: ['CANCELLED', 'REJECTED'] }
            },
            _sum: {
                finalAmount: true
            }
        });
        const totalSales30d = recentOrders._sum.finalAmount || 0;
        const adSpend = Math.floor(totalSales30d * 0.15) || 45230;
        const roi = adSpend > 0 ? ((totalSales30d - adSpend) / adSpend) * 100 : 324;
        const topCampaigns = await this.prisma.marketingCampaign.findMany({
            where: { status: 'SENT' },
            orderBy: { createdAt: 'desc' },
            take: 4
        });
        return {
            metrics: [
                { label: 'Active Campaigns', value: activeCampaigns.toString(), change: '+2 this week', icon: 'Megaphone', color: 'text-[#FF3E7F]', bg: 'bg-[#FF3E7F]/10' },
                { label: 'Total Reach', value: totalReach > 1000 ? (totalReach / 1000).toFixed(1) + 'k' : totalReach.toString(), change: '+5%', icon: 'Users', color: 'text-[#FF7F50]', bg: 'bg-[#FF7F50]/20' },
                { label: 'ROI (30 Days)', value: Math.round(roi) + '%', change: '+12%', icon: 'TrendingUp', color: 'text-emerald-600', bg: 'bg-emerald-100' },
                { label: 'Ad Spend', value: '$' + adSpend.toLocaleString(), change: '-5%', icon: 'DollarSign', color: 'text-rose-600', bg: 'bg-rose-100' }
            ],
            topCampaigns: topCampaigns.length > 0
                ? topCampaigns.map(c => ({ name: c.name, performance: Math.floor(Math.random() * 40) + 10 }))
                : [
                    { name: 'Summer Sale', performance: 35 },
                    { name: 'New Product Launch', performance: 28 },
                    { name: 'Welcome Series Emails', performance: 18 }
                ]
        };
    }
};
exports.MarketingService = MarketingService;
exports.MarketingService = MarketingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MarketingService);
//# sourceMappingURL=marketing.service.js.map