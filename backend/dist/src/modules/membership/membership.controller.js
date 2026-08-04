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
exports.MembershipController = void 0;
const common_1 = require("@nestjs/common");
const membership_service_1 = require("./membership.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let MembershipController = class MembershipController {
    membershipService;
    constructor(membershipService) {
        this.membershipService = membershipService;
    }
    getMyTier(req) {
        return this.membershipService.getMyTier(req.user.id);
    }
    getPublicTiers() {
        return this.membershipService.getTiers();
    }
    getTiers() {
        return this.membershipService.getTiers();
    }
    createTier(data) {
        return this.membershipService.createTier(data);
    }
    updateTier(id, data) {
        return this.membershipService.updateTier(id, data);
    }
    deleteTier(id) {
        return this.membershipService.deleteTier(id);
    }
};
exports.MembershipController = MembershipController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('membership/my-tier'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getMyTier", null);
__decorate([
    (0, common_1.Get)('membership/tiers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getPublicTiers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admin/membership/tiers'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'MARKETING_MANAGER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "getTiers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('admin/membership/tiers'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'MARKETING_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "createTier", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Put)('admin/membership/tiers/:id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'MARKETING_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "updateTier", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Delete)('admin/membership/tiers/:id'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'MARKETING_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MembershipController.prototype, "deleteTier", null);
exports.MembershipController = MembershipController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [membership_service_1.MembershipService])
], MembershipController);
//# sourceMappingURL=membership.controller.js.map