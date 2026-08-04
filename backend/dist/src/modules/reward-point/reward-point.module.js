"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardPointModule = void 0;
const common_1 = require("@nestjs/common");
const reward_point_service_1 = require("./reward-point.service");
const reward_point_controller_1 = require("./reward-point.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let RewardPointModule = class RewardPointModule {
};
exports.RewardPointModule = RewardPointModule;
exports.RewardPointModule = RewardPointModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [reward_point_controller_1.RewardPointController],
        providers: [reward_point_service_1.RewardPointService],
        exports: [reward_point_service_1.RewardPointService]
    })
], RewardPointModule);
//# sourceMappingURL=reward-point.module.js.map