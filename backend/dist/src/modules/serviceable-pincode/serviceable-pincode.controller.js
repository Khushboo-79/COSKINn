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
exports.ServiceablePincodeController = void 0;
const common_1 = require("@nestjs/common");
const serviceable_pincode_service_1 = require("./serviceable-pincode.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const serviceable_pincode_dto_1 = require("./dto/serviceable-pincode.dto");
let ServiceablePincodeController = class ServiceablePincodeController {
    pincodeService;
    constructor(pincodeService) {
        this.pincodeService = pincodeService;
    }
    create(createDto) {
        return this.pincodeService.create(createDto);
    }
    findAll(city, state) {
        return this.pincodeService.findAll({ city, state });
    }
    checkServiceability(code) {
        return this.pincodeService.checkServiceability(code);
    }
    findOne(id) {
        return this.pincodeService.findOne(id);
    }
    update(id, updateDto) {
        return this.pincodeService.update(id, updateDto);
    }
    remove(id) {
        return this.pincodeService.remove(id);
    }
};
exports.ServiceablePincodeController = ServiceablePincodeController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'OPERATIONS_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [serviceable_pincode_dto_1.CreateServiceablePincodeDto]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('city')),
    __param(1, (0, common_1.Query)('state')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('check/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "checkServiceability", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'OPERATIONS_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'OPERATIONS_MANAGER'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, serviceable_pincode_dto_1.UpdateServiceablePincodeDto]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ServiceablePincodeController.prototype, "remove", null);
exports.ServiceablePincodeController = ServiceablePincodeController = __decorate([
    (0, common_1.Controller)('serviceable-pincode'),
    __metadata("design:paramtypes", [serviceable_pincode_service_1.ServiceablePincodeService])
], ServiceablePincodeController);
//# sourceMappingURL=serviceable-pincode.controller.js.map