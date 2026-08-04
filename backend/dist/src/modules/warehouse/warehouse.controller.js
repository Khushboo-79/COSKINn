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
exports.WarehouseController = void 0;
const common_1 = require("@nestjs/common");
const warehouse_service_1 = require("./warehouse.service");
const warehouse_dto_1 = require("./dto/warehouse.dto");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let WarehouseController = class WarehouseController {
    warehouseService;
    constructor(warehouseService) {
        this.warehouseService = warehouseService;
    }
    getPurchaseOrders() {
        return this.warehouseService.getPurchaseOrders();
    }
    createPurchaseOrder(dto) {
        return this.warehouseService.createPurchaseOrder(dto);
    }
    getBins() {
        return this.warehouseService.getBins();
    }
    createBin(dto) {
        return this.warehouseService.createBin(dto);
    }
    createGrn(dto) {
        return this.warehouseService.createGrn(dto);
    }
    generatePickList(dto) {
        return this.warehouseService.generatePickList(dto);
    }
    verifyBarcodeScan(dto) {
        return this.warehouseService.verifyBarcodeScan(dto);
    }
};
exports.WarehouseController = WarehouseController;
__decorate([
    (0, common_1.Get)('purchase-orders'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "getPurchaseOrders", null);
__decorate([
    (0, common_1.Post)('purchase-orders'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_dto_1.CreatePurchaseOrderDto]),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "createPurchaseOrder", null);
__decorate([
    (0, common_1.Get)('bins'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "getBins", null);
__decorate([
    (0, common_1.Post)('bins'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "createBin", null);
__decorate([
    (0, common_1.Post)('grn'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'INVENTORY_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_dto_1.CreateGrnDto]),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "createGrn", null);
__decorate([
    (0, common_1.Post)('pick-list'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF', 'ORDER_MANAGER'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_dto_1.GeneratePickListDto]),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "generatePickList", null);
__decorate([
    (0, common_1.Post)('scan'),
    (0, roles_decorator_1.Roles)('SUPER_ADMIN', 'WAREHOUSE_STAFF'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [warehouse_dto_1.BarcodeScanDto]),
    __metadata("design:returntype", void 0)
], WarehouseController.prototype, "verifyBarcodeScan", null);
exports.WarehouseController = WarehouseController = __decorate([
    (0, common_1.Controller)('warehouse'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [warehouse_service_1.WarehouseService])
], WarehouseController);
//# sourceMappingURL=warehouse.controller.js.map