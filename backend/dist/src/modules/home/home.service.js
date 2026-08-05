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
        const [categories, newestProducts, allIngredients] = await Promise.all([
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
            this.prisma.productIngredient.findMany({
                where: { product: productWhere },
                select: { name: true }
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
        const heroBanners = [
            {
                id: 'banner_1',
                imageUrl: 'https://fairenne-assets.s3.amazonaws.com/banners/summer-sale.jpg',
                linkUrl: '/products?minPrice=500',
                altText: 'Summer Skincare Sale'
            }
        ];
        return {
            heroBanners,
            categoryRail: categories,
            fruitIngredientRail: fruitIngredients,
            newArrivals: newestProducts
        };
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
//# sourceMappingURL=home.service.js.map