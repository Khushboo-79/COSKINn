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
exports.CatalogController = void 0;
const common_1 = require("@nestjs/common");
const catalog_service_1 = require("./catalog.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CatalogController = class CatalogController {
    catalogService;
    constructor(catalogService) {
        this.catalogService = catalogService;
    }
    getHomeDashboard() {
        return this.catalogService.getHomeDashboard();
    }
    searchProducts(q) {
        return this.catalogService.searchProducts(q);
    }
    getProducts(page, limit, minPrice, maxPrice, category, skinType, skinConcern, ingredient, sort) {
        return this.catalogService.getProducts({
            page,
            limit,
            minPrice,
            maxPrice,
            category,
            skinType,
        });
    }
    getProductBySlug(slug) {
        return this.catalogService.getProductBySlug(slug);
    }
    getProductReviews(id) {
        return this.catalogService.getProductReviews(id);
    }
    submitProductReview(req, id, dto) {
        return this.catalogService.submitProductReview(id, req.user.id, dto);
    }
    getSimilarProducts(id) {
        return this.catalogService.getSimilarProducts(id);
    }
    getRecommendations() {
        return this.catalogService.getRecommendations();
    }
    getCategoryBySlug(slug) {
        return this.catalogService.getCategoryBySlug(slug);
    }
    getSkinTypes() {
        return this.catalogService.getSkinTypes();
    }
    getSkinConcerns() {
        return this.catalogService.getSkinConcerns();
    }
    getIngredients() {
        return this.catalogService.getIngredients();
    }
};
exports.CatalogController = CatalogController;
__decorate([
    (0, common_1.Get)('home'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getHomeDashboard", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "searchProducts", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('minPrice')),
    __param(3, (0, common_1.Query)('maxPrice')),
    __param(4, (0, common_1.Query)('category')),
    __param(5, (0, common_1.Query)('skinType')),
    __param(6, (0, common_1.Query)('skinConcern')),
    __param(7, (0, common_1.Query)('ingredient')),
    __param(8, (0, common_1.Query)('sort')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getProductBySlug", null);
__decorate([
    (0, common_1.Get)('products/:id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getProductReviews", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('products/:id/reviews'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "submitProductReview", null);
__decorate([
    (0, common_1.Get)('products/:id/similar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getSimilarProducts", null);
__decorate([
    (0, common_1.Get)('customer/recommendations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getRecommendations", null);
__decorate([
    (0, common_1.Get)('categories/:slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getCategoryBySlug", null);
__decorate([
    (0, common_1.Get)('skin-types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getSkinTypes", null);
__decorate([
    (0, common_1.Get)('skin-concerns'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getSkinConcerns", null);
__decorate([
    (0, common_1.Get)('ingredients'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "getIngredients", null);
exports.CatalogController = CatalogController = __decorate([
    (0, common_1.Controller)('catalog'),
    __metadata("design:paramtypes", [catalog_service_1.CatalogService])
], CatalogController);
//# sourceMappingURL=catalog.controller.js.map