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
exports.EngagementService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EngagementService = class EngagementService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProductReviews(productId) {
        return this.prisma.productReview.findMany({
            where: { productId, isApproved: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async addReview(userId, productId, data) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.productReview.create({
            data: {
                userId,
                productId,
                rating: data.rating,
                title: data.title,
                content: data.content,
                isApproved: false,
            },
        });
    }
    async getProductQuestions(productId) {
        return this.prisma.productQuestion.findMany({
            where: { productId, isApproved: true },
            orderBy: { createdAt: 'desc' },
            include: {
                answers: { where: { isApproved: true } },
            },
        });
    }
    async addQuestion(userId, productId, content) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        return this.prisma.productQuestion.create({
            data: {
                userId,
                productId,
                content,
                isApproved: false,
            },
        });
    }
};
exports.EngagementService = EngagementService;
exports.EngagementService = EngagementService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EngagementService);
//# sourceMappingURL=engagement.service.js.map