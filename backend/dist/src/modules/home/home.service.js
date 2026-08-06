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
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let HomeService = class HomeService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getHomeDashboard(segment) {
        const categoryWhere = { isActive: true, isDeleted: false };
        const productWhere = { isDeleted: false, status: 'LIVE' };
        if (segment && segment !== 'BOTH') {
            categoryWhere.OR = [
                { productLine: segment },
                { productLine: 'BOTH' }
            ];
            productWhere.AND = [
                {
                    OR: [
                        { productLine: segment },
                        { productLine: 'BOTH' },
                        { isCrossSegment: true }
                    ]
                }
            ];
        }
        const [categories, newestProducts, bestSellerProducts, allIngredients, heroBanners] = await Promise.all([
            this.prisma.category.findMany({
                where: categoryWhere,
                select: { id: true, name: true, slug: true, imageUrl: true },
                take: 8
            }),
            this.prisma.product.findMany({
                where: productWhere,
                include: {
                    variants: true,
                    images: { orderBy: { sortOrder: 'asc' }, take: 1 },
                },
                orderBy: { createdAt: 'desc' },
                take: 6
            }),
            this.prisma.product.findMany({
                where: { ...productWhere, isBestseller: true },
                include: {
                    variants: true,
                    images: { orderBy: { sortOrder: 'asc' }, take: 1 },
                },
                take: 4
            }),
            this.prisma.productIngredient.findMany({
                where: { product: productWhere },
                select: { name: true }
            }),
            this.prisma.banner.findMany({
                where: { position: 'hero' }
            })
        ]);
        const ingredientCountMap = {};
        for (const ing of allIngredients) {
            ingredientCountMap[ing.name] = (ingredientCountMap[ing.name] || 0) + 1;
        }
        const fruitIngredients = Object.entries(ingredientCountMap)
            .map(([name, count]) => ({ name, productCount: count }))
            .sort((a, b) => b.productCount - a.productCount)
            .slice(0, 6);
        return {
            heroBanners,
            categoryRail: categories,
            fruitIngredientRail: fruitIngredients,
            newArrivals: newestProducts,
            bestSellers: bestSellerProducts
        };
    }
    async createBanner(data) {
        return this.prisma.banner.create({
            data: {
                title: data.title || 'New Banner',
                position: data.position || 'hero',
                imageUrl: data.imageUrl,
                linkUrl: data.linkUrl || '',
                sortOrder: data.sortOrder || 0,
                isActive: true,
            }
        });
    }
    async deleteBanner(id) {
        const banner = await this.prisma.banner.findUnique({ where: { id } });
        if (!banner)
            throw new common_1.NotFoundException('Banner not found');
        return this.prisma.banner.delete({ where: { id } });
    }
    async setBestseller(productId, isBestseller) {
        const product = await this.prisma.product.findUnique({ where: { id: productId } });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.product.update({
            where: { id: productId },
            data: { isBestseller }
        });
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
//# sourceMappingURL=home.service.js.map