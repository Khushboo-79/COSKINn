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
exports.AppVersionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AppVersionService = class AppVersionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.appVersion.create({
            data,
        });
    }
    async checkVersion(platform, currentVersion) {
        const latest = await this.prisma.appVersion.findFirst({
            where: { platform },
            orderBy: { createdAt: 'desc' },
        });
        if (!latest) {
            return { status: 'UP_TO_DATE', updateUrl: '' };
        }
        const isOlder = currentVersion !== latest.latestVersion &&
            currentVersion < latest.latestVersion;
        if (isOlder) {
            if (latest.forceUpdate || currentVersion < latest.minVersion) {
                return { status: 'FORCE_UPDATE', updateUrl: 'appstore-url' };
            }
            return { status: 'OPTIONAL_UPDATE', updateUrl: 'appstore-url' };
        }
        return { status: 'UP_TO_DATE', updateUrl: '' };
    }
    async findAll() {
        return this.prisma.appVersion.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.AppVersionService = AppVersionService;
exports.AppVersionService = AppVersionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppVersionService);
//# sourceMappingURL=app-version.service.js.map