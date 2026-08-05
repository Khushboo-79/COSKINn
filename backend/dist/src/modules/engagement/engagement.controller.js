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
exports.EngagementController = void 0;
const common_1 = require("@nestjs/common");
const engagement_service_1 = require("./engagement.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
let EngagementController = class EngagementController {
    engagementService;
    constructor(engagementService) {
        this.engagementService = engagementService;
    }
    async getReviews(id) {
        return this.engagementService.getProductReviews(id);
    }
    async addReview(id, body, req) {
        return this.engagementService.addReview(req.user.userId, id, body);
    }
    async getQuestions(id) {
        return this.engagementService.getProductQuestions(id);
    }
    async addQuestion(id, content, req) {
        return this.engagementService.addQuestion(req.user.userId, id, content);
    }
};
exports.EngagementController = EngagementController;
__decorate([
    (0, common_1.Get)(':id/reviews'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EngagementController.prototype, "getReviews", null);
__decorate([
    (0, common_1.Post)(':id/reviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], EngagementController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(':id/questions'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EngagementController.prototype, "getQuestions", null);
__decorate([
    (0, common_1.Post)(':id/questions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('content')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], EngagementController.prototype, "addQuestion", null);
exports.EngagementController = EngagementController = __decorate([
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [engagement_service_1.EngagementService])
], EngagementController);
//# sourceMappingURL=engagement.controller.js.map