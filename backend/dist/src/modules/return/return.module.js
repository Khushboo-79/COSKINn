"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnModule = void 0;
const common_1 = require("@nestjs/common");
const return_service_1 = require("./return.service");
const return_controller_1 = require("./return.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const inventory_module_1 = require("../inventory/inventory.module");
const refund_module_1 = require("../refund/refund.module");
let ReturnModule = class ReturnModule {
};
exports.ReturnModule = ReturnModule;
exports.ReturnModule = ReturnModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, inventory_module_1.InventoryModule, refund_module_1.RefundModule],
        controllers: [return_controller_1.ReturnController],
        providers: [return_service_1.ReturnService],
        exports: [return_service_1.ReturnService],
    })
], ReturnModule);
//# sourceMappingURL=return.module.js.map