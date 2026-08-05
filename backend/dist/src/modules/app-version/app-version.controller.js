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
exports.AppVersionController = void 0;
const common_1 = require("@nestjs/common");
const app_version_service_1 = require("./app-version.service");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let AppVersionController = class AppVersionController {
    appVersionService;
    constructor(appVersionService) {
        this.appVersionService = appVersionService;
    }
    create(data) {
        return this.appVersionService.create(data);
    }
    checkVersion(platform, version) {
        return this.appVersionService.checkVersion(platform, version);
    }
    findAll() {
        return this.appVersionService.findAll();
    }
};
exports.AppVersionController = AppVersionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppVersionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('check'),
    __param(0, (0, common_1.Query)('platform')),
    __param(1, (0, common_1.Query)('version')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AppVersionController.prototype, "checkVersion", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppVersionController.prototype, "findAll", null);
exports.AppVersionController = AppVersionController = __decorate([
    (0, common_1.Controller)('app-version'),
    __metadata("design:paramtypes", [app_version_service_1.AppVersionService])
], AppVersionController);
//# sourceMappingURL=app-version.controller.js.map