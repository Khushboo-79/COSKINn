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
exports.RewardPointController = void 0;
const common_1 = require("@nestjs/common");
const reward_point_service_1 = require("./reward-point.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let RewardPointController = class RewardPointController {
    rewardPointService;
    constructor(rewardPointService) {
        this.rewardPointService = rewardPointService;
    }
    async getMyPoints(req) {
        const balance = await this.rewardPointService.getBalance(req.user.id);
        const history = await this.rewardPointService.getMyLedger(req.user.id);
        return { balance, history };
    }
    async getAdminLedger() {
        return this.rewardPointService.getAdminLedger();
    }
};
exports.RewardPointController = RewardPointController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RewardPointController.prototype, "getMyPoints", null);
__decorate([
    (0, common_1.Get)('admin/ledger'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'MARKETING_MANAGER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RewardPointController.prototype, "getAdminLedger", null);
exports.RewardPointController = RewardPointController = __decorate([
    (0, common_1.Controller)('reward-point'),
    __metadata("design:paramtypes", [reward_point_service_1.RewardPointService])
], RewardPointController);
//# sourceMappingURL=reward-point.controller.js.map