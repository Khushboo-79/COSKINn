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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const prisma_service_1 = require("../../prisma/prisma.service");
let ReviewController = class ReviewController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(search, status) {
        const where = {};
        if (status === 'PENDING')
            where.isApproved = false;
        if (status === 'APPROVED')
            where.isApproved = true;
        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { content: { contains: search, mode: 'insensitive' } },
                { product: { name: { contains: search, mode: 'insensitive' } } },
            ];
        }
        return this.prisma.productReview.findMany({
            where,
            include: {
                product: { select: { name: true, images: true } },
                user: { select: { firstName: true, lastName: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async approveReview(id) {
        return this.prisma.productReview.update({
            where: { id },
            data: { isApproved: true },
        });
    }
    async deleteReview(id) {
        return this.prisma.productReview.delete({
            where: { id },
        });
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PRODUCT_MANAGER'),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PRODUCT_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "approveReview", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'PRODUCT_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "deleteReview", null);
exports.ReviewController = ReviewController = __decorate([
    (0, common_1.Controller)('product-review'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewController);
//# sourceMappingURL=review.controller.js.map