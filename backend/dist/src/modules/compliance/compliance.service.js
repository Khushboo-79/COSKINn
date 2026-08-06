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
exports.ComplianceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ComplianceService = class ComplianceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateConsent(userId, data) {
        return this.prisma.customerConsent.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                push: data.push ?? true,
                email: data.email ?? true,
                sms: data.sms ?? true,
                whatsapp: data.whatsapp ?? true,
            },
        });
    }
    async getConsent(userId) {
        let consent = await this.prisma.customerConsent.findUnique({
            where: { userId },
        });
        if (!consent) {
            consent = await this.prisma.customerConsent.create({
                data: { userId },
            });
        }
        return consent;
    }
    async createDataRequest(userId, requestType) {
        return this.prisma.dataRequest.create({
            data: {
                userId,
                requestType,
                status: 'PENDING',
            },
        });
    }
    async getAdminDataRequests() {
        return this.prisma.dataRequest.findMany({
            include: {
                user: { select: { email: true, phone: true, firstName: true } },
            },
            orderBy: { requestedAt: 'desc' },
        });
    }
    async updateDataRequestStatus(id, status) {
        return this.prisma.dataRequest.update({
            where: { id },
            data: {
                status,
                fulfilledAt: status === 'FULFILLED' ? new Date() : null,
            },
        });
    }
};
exports.ComplianceService = ComplianceService;
exports.ComplianceService = ComplianceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ComplianceService);
//# sourceMappingURL=compliance.service.js.map