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
exports.ReturnService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
const refund_service_1 = require("../refund/refund.service");
let ReturnService = class ReturnService {
    prisma;
    inventoryService;
    refundService;
    constructor(prisma, inventoryService, refundService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
        this.refundService = refundService;
    }
    async findAll(status) {
        const where = status ? { status } : {};
        return this.prisma.return.findMany({
            where,
            include: {
                order: {
                    select: {
                        id: true,
                        user: { select: { email: true, firstName: true } },
                    },
                },
                items: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async requestReturn(dto, userId) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.userId !== userId)
            throw new common_1.BadRequestException('Not authorized');
        if (order.status !== 'DELIVERED') {
            throw new common_1.BadRequestException('Only DELIVERED orders can be returned');
        }
        return this.prisma.return.create({
            data: {
                orderId: dto.orderId,
                status: 'REQUESTED',
                reason: dto.reason,
                refundType: dto.refundType,
                items: {
                    create: order.items.map((item) => ({
                        sku: item.sku,
                        quantity: item.quantity,
                    })),
                },
            },
        });
    }
    async processReturn(id, dto) {
        const returnReq = await this.prisma.return.findUnique({ where: { id } });
        if (!returnReq)
            throw new common_1.NotFoundException('Return not found');
        if (returnReq.status !== 'REQUESTED') {
            throw new common_1.BadRequestException('Return is not in REQUESTED status');
        }
        return this.prisma.return.update({
            where: { id },
            data: { status: dto.action },
        });
    }
    async processQC(id, dto) {
        const returnReq = await this.prisma.return.findUnique({
            where: { id },
            include: { items: true, order: true },
        });
        if (!returnReq)
            throw new common_1.NotFoundException('Return not found');
        if (returnReq.status !== 'RECEIVED' && returnReq.status !== 'APPROVED') {
            throw new common_1.BadRequestException('Return must be APPROVED/RECEIVED for QC');
        }
        return this.prisma.$transaction(async (tx) => {
            if (dto.qcResult === 'PASS') {
                for (const item of returnReq.items) {
                    const warehouse = await tx.warehouse.findFirst();
                    if (warehouse) {
                        await this.inventoryService.stockIn({
                            warehouseId: warehouse.id,
                            sku: item.sku,
                            quantity: item.quantity,
                            reference: `Return QC Pass: ${returnReq.id}`,
                        }, tx);
                    }
                }
                await this.refundService.processRefund({
                    orderId: returnReq.orderId,
                    amount: returnReq.order.finalAmount,
                }, returnReq.refundType);
                return tx.return.update({
                    where: { id },
                    data: { status: 'REFUNDED' },
                });
            }
            else {
                for (const item of returnReq.items) {
                    await this.inventoryService.reportDamaged({
                        warehouseId: 'MAIN',
                        sku: item.sku,
                        quantity: item.quantity,
                        reason: `Return QC Fail: ${returnReq.id}`,
                    });
                }
                return tx.return.update({
                    where: { id },
                    data: { status: 'REJECTED_QC' },
                });
            }
        });
    }
};
exports.ReturnService = ReturnService;
exports.ReturnService = ReturnService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService,
        refund_service_1.RefundService])
], ReturnService);
//# sourceMappingURL=return.service.js.map