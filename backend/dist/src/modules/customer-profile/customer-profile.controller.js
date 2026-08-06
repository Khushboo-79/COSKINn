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
exports.CustomerProfileController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const customer_profile_service_1 = require("./customer-profile.service");
const update_customer_profile_dto_1 = require("./dto/update-customer-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let CustomerProfileController = class CustomerProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getProfile(req) {
        return this.profileService.getProfile(req.user.id);
    }
    async saveSkinQuiz(req, dto) {
        return {
            message: 'Skin quiz preferences saved successfully!',
            recommendationsUrl: '/api/customer/recommendations',
        };
    }
    async updateProfile(req, dto) {
        return this.profileService.upsertProfile(req.user.id, dto);
    }
    async deleteMyAccount(req) {
        return this.profileService.deleteMyAccount(req.user.id);
    }
    async getAddresses(req) {
        return this.profileService.getAddresses(req.user.id);
    }
    async checkServiceability(pincode) {
        if (!pincode ||
            pincode.length !== 6 ||
            pincode.startsWith('9') ||
            pincode.startsWith('0')) {
            return {
                serviceable: false,
                codAvailable: false,
                message: 'Delivery not available to this pincode',
            };
        }
        return {
            serviceable: true,
            codAvailable: true,
            message: 'Delivery is available',
        };
    }
    async addAddress(req, dto) {
        return this.profileService.addAddress(req.user.id, dto);
    }
    async updateAddress(req, id, dto) {
        return this.profileService.updateAddress(req.user.id, id, dto);
    }
    async deleteAddress(req, id) {
        return this.profileService.deleteAddress(req.user.id, id);
    }
    async getAllCustomers(page = 1, limit = 10, search, platform) {
        return this.profileService.getAllCustomers(Number(page), Number(limit), search, platform);
    }
    async getCustomer360(id, platform) {
        return this.profileService.getCustomer360(id, platform);
    }
    async blockUser(id) {
        return this.profileService.updateUserStatus(id, false);
    }
    async unblockUser(id) {
        return this.profileService.updateUserStatus(id, true);
    }
    async sendResetPasswordLink(id) {
        return this.profileService.sendResetPasswordLink(id);
    }
};
exports.CustomerProfileController = CustomerProfileController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('skin-quiz'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "saveSkinQuiz", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_customer_profile_dto_1.UpdateCustomerProfileDto]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('me'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "deleteMyAccount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('addresses'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "getAddresses", null);
__decorate([
    (0, common_1.Get)('addresses/serviceability'),
    __param(0, (0, common_1.Query)('pincode')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "checkServiceability", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('addresses'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "addAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('addresses/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('addresses/:id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "deleteAddress", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admin/all'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __param(3, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "getAllCustomers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('admin/:id/360'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "getCustomer360", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('admin/:id/block'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "blockUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('admin/:id/unblock'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "unblockUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('admin/:id/reset-password'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomerProfileController.prototype, "sendResetPasswordLink", null);
exports.CustomerProfileController = CustomerProfileController = __decorate([
    (0, common_1.Controller)('customer'),
    __metadata("design:paramtypes", [customer_profile_service_1.CustomerProfileService])
], CustomerProfileController);
//# sourceMappingURL=customer-profile.controller.js.map