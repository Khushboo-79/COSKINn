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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrModule = void 0;
const common_1 = require("@nestjs/common");
const hr_service_1 = require("./hr.service");
const hr_controller_1 = require("./hr.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let HrModule = class HrModule {
    hrService;
    constructor(hrService) {
        this.hrService = hrService;
    }
    async onModuleInit() {
        await this.hrService.seedHrData();
    }
};
exports.HrModule = HrModule;
exports.HrModule = HrModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [hr_controller_1.HrController],
        providers: [hr_service_1.HrService],
        exports: [hr_service_1.HrService],
    }),
    __metadata("design:paramtypes", [hr_service_1.HrService])
], HrModule);
//# sourceMappingURL=hr.module.js.map