"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceablePincodeModule = void 0;
const common_1 = require("@nestjs/common");
const serviceable_pincode_service_1 = require("./serviceable-pincode.service");
const serviceable_pincode_controller_1 = require("./serviceable-pincode.controller");
let ServiceablePincodeModule = class ServiceablePincodeModule {
};
exports.ServiceablePincodeModule = ServiceablePincodeModule;
exports.ServiceablePincodeModule = ServiceablePincodeModule = __decorate([
    (0, common_1.Module)({
        controllers: [serviceable_pincode_controller_1.ServiceablePincodeController],
        providers: [serviceable_pincode_service_1.ServiceablePincodeService],
        exports: [serviceable_pincode_service_1.ServiceablePincodeService],
    })
], ServiceablePincodeModule);
//# sourceMappingURL=serviceable-pincode.module.js.map