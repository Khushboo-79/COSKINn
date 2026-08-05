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
exports.WarehouseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
let WarehouseService = class WarehouseService {
    prisma;
    inventoryService;
    constructor(prisma, inventoryService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
    }
    async createPurchaseOrder(dto) {
        return this.prisma.purchaseOrder.create({
            data: {
                warehouseId: dto.warehouseId,
                status: 'ISSUED',
                items: {
                    create: dto.items.map(item => ({
                        sku: item.sku,
                        requestedQty: item.requestedQty,
                        unitPrice: item.unitPrice
                    }))
                }
            },
            include: { items: true }
        });
    }
    async getPurchaseOrders() {
        return this.prisma.purchaseOrder.findMany({
            include: { items: true, warehouse: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async createGrn(dto) {
        return this.prisma.$transaction(async (prisma) => {
            const po = await prisma.purchaseOrder.findUnique({
                where: { id: dto.purchaseOrderId },
                include: { items: true }
            });
            if (!po)
                throw new common_1.NotFoundException('Purchase Order not found');
            const grn = await prisma.goodsReceivedNote.create({
                data: {
                    purchaseOrderId: dto.purchaseOrderId,
                    items: {
                        create: dto.items.map(item => ({
                            sku: item.sku,
                            receivedQty: item.receivedQty,
                            acceptedQty: item.acceptedQty,
                            rejectedQty: item.rejectedQty,
                            reason: item.reason
                        }))
                    }
                },
                include: { items: true }
            });
            await prisma.purchaseOrder.update({
                where: { id: dto.purchaseOrderId },
                data: { status: 'RECEIVED' }
            });
            for (const item of dto.items) {
                if (item.acceptedQty > 0) {
                    await prisma.inventoryStock.upsert({
                        where: {
                            warehouseId_sku: {
                                warehouseId: po.warehouseId,
                                sku: item.sku
                            }
                        },
                        update: {
                            quantity: { increment: item.acceptedQty }
                        },
                        create: {
                            warehouseId: po.warehouseId,
                            sku: item.sku,
                            quantity: item.acceptedQty
                        }
                    });
                    await prisma.stockMovement.create({
                        data: {
                            warehouseId: po.warehouseId,
                            sku: item.sku,
                            type: 'IN',
                            quantity: item.acceptedQty,
                            reference: `GRN-${grn.id}`
                        }
                    });
                }
            }
            return grn;
        });
    }
    async generatePickList(dto) {
        const orders = await this.prisma.order.findMany({
            where: { id: { in: dto.orderIds }, status: 'PLACED' },
            include: { items: true },
        });
        if (orders.length === 0) {
            throw new common_1.BadRequestException('No eligible orders found for pick-list generation.');
        }
        const pickList = new Map();
        for (const order of orders) {
            for (const item of order.items) {
                pickList.set(item.sku, (pickList.get(item.sku) || 0) + item.quantity);
            }
        }
        return {
            orderIds: orders.map(o => o.id),
            aggregatedItems: Array.from(pickList.entries()).map(([sku, quantity]) => ({ sku, quantity })),
        };
    }
    async getBins(warehouseId) {
        return this.prisma.warehouseBin.findMany({
            where: warehouseId ? { warehouseId } : undefined,
            include: { warehouse: true, stocks: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async createBin(dto) {
        return this.prisma.warehouseBin.create({
            data: {
                warehouseId: dto.warehouseId,
                code: dto.code,
                description: dto.description
            },
            include: { warehouse: true }
        });
    }
    async verifyBarcodeScan(dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: { items: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        const item = order.items.find(i => i.sku === dto.barcode);
        if (!item) {
            return { success: false, message: `SKU ${dto.barcode} does not belong to Order ${dto.orderId}` };
        }
        return { success: true, message: `SKU ${dto.barcode} verified for Order ${dto.orderId}` };
    }
};
exports.WarehouseService = WarehouseService;
exports.WarehouseService = WarehouseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService])
], WarehouseService);
//# sourceMappingURL=warehouse.service.js.map