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
exports.PublicCatalogController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
let PublicCatalogController = class PublicCatalogController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async findAll(page, limit, minPrice, maxPrice, skinType, fruit, concern, sortBy, segment) {
        const pageNumber = page ? parseInt(page, 10) : 1;
        const limitNumber = limit ? parseInt(limit, 10) : 20;
        return this.productService.findAllPublic(pageNumber, limitNumber, {
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
            skinType,
            fruit,
            concern,
            sortBy,
            segment: segment ? segment.toUpperCase() : undefined
        });
    }
    async search(query, segment) {
        if (!query || query.trim() === '') {
            return [];
        }
        return this.productService.search(query, segment ? segment.toUpperCase() : undefined);
    }
    async findByCategory(categoryId, segment) {
        return this.productService.findByCategory(categoryId, segment ? segment.toUpperCase() : undefined);
    }
    async findByConcern(concernId, segment) {
        return this.productService.findByConcern(concernId, segment ? segment.toUpperCase() : undefined);
    }
    async findByFruit(fruitName, segment) {
        return this.productService.findByFruit(fruitName, segment ? segment.toUpperCase() : undefined);
    }
    async findOne(id) {
        return this.productService.findOnePublic(id);
    }
    async getProductVariants(id) {
        return this.productService.getProductVariantsPublic(id);
    }
};
exports.PublicCatalogController = PublicCatalogController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('minPrice')),
    __param(3, (0, common_1.Query)('maxPrice')),
    __param(4, (0, common_1.Query)('skinType')),
    __param(5, (0, common_1.Query)('fruit')),
    __param(6, (0, common_1.Query)('concern')),
    __param(7, (0, common_1.Query)('sortBy')),
    __param(8, (0, common_1.Query)('segment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('segment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('category/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('segment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "findByCategory", null);
__decorate([
    (0, common_1.Get)('concern/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('segment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "findByConcern", null);
__decorate([
    (0, common_1.Get)('fruit/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Query)('segment')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "findByFruit", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/variants'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicCatalogController.prototype, "getProductVariants", null);
exports.PublicCatalogController = PublicCatalogController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], PublicCatalogController);
//# sourceMappingURL=public-catalog.controller.js.map