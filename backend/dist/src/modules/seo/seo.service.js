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
exports.SeoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SeoService = class SeoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProductSeo(slug) {
        const product = await this.prisma.product.findUnique({
            where: { slug },
            select: {
                seoTitle: true,
                seoDesc: true,
                seoKeywords: true,
                name: true,
                description: true,
                productLine: true,
                isCrossSegment: true,
            },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return {
            title: product.seoTitle || product.name,
            description: product.seoDesc || product.description?.substring(0, 160),
            keywords: product.seoKeywords || '',
            segment: product.productLine,
            isCrossSegment: product.isCrossSegment,
        };
    }
    async getCategorySeo(slug) {
        const category = await this.prisma.category.findUnique({
            where: { slug },
            select: { name: true, description: true, productLine: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return {
            title: `${category.name} | Fairenne`,
            description: category.description || `Browse our collection of ${category.name}`,
            keywords: category.name.toLowerCase(),
            segment: category.productLine,
        };
    }
    async getFruitSeo(name) {
        const fruitName = name.charAt(0).toUpperCase() + name.slice(1);
        return {
            title: `${fruitName} Infused Skincare | Fairenne`,
            description: `Discover the benefits of ${fruitName} for your skin. Shop our exclusive ${fruitName} collection.`,
            keywords: `${fruitName.toLowerCase()}, skincare, fairenne`,
        };
    }
    async getGlobalSeo() {
        const seo = await this.prisma.globalSeo.findFirst();
        if (!seo) {
            return this.prisma.globalSeo.create({
                data: {
                    title: 'Fairenne - Premium Skincare & Cosmetics',
                    description: 'Discover our premium range of fruit-infused skincare and cosmetics.',
                    keywords: 'skincare, cosmetics, fruit, natural',
                },
            });
        }
        return seo;
    }
    async updateGlobalSeo(data) {
        const seo = await this.getGlobalSeo();
        return this.prisma.globalSeo.update({
            where: { id: seo.id },
            data,
        });
    }
};
exports.SeoService = SeoService;
exports.SeoService = SeoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeoService);
//# sourceMappingURL=seo.service.js.map