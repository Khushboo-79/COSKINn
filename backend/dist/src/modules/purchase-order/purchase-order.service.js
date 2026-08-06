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
exports.PurchaseOrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const inventory_service_1 = require("../inventory/inventory.service");
let PurchaseOrderService = class PurchaseOrderService {
    prisma;
    inventoryService;
    constructor(prisma, inventoryService) {
        this.prisma = prisma;
        this.inventoryService = inventoryService;
    }
    async create(dto) {
        return this.prisma.purchaseOrder.create({
            data: {
                warehouseId: dto.warehouseId,
                supplierId: dto.supplierId,
                status: dto.status || 'DRAFT',
            },
        });
    }
    async findAll() {
        return this.prisma.purchaseOrder.findMany({
            include: { warehouse: true, grns: true, supplier: true },
        });
    }
    async findOne(id) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id },
            include: { warehouse: true, grns: true, supplier: true },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        return po;
    }
    async createGrn(dto) {
        const po = await this.prisma.purchaseOrder.findUnique({
            where: { id: dto.purchaseOrderId },
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        return this.prisma.$transaction(async (prisma) => {
            const grn = await prisma.goodsReceivedNote.create({
                data: {
                    purchaseOrderId: dto.purchaseOrderId,
                },
            });
            await prisma.purchaseOrder.update({
                where: { id: dto.purchaseOrderId },
                data: { status: 'RECEIVED' },
            });
            for (const item of dto.items) {
                await this.inventoryService.stockIn({
                    warehouseId: po.warehouseId,
                    sku: item.sku,
                    quantity: item.quantity,
                    reference: `GRN: ${grn.id}`,
                });
            }
            return grn;
        });
    }
};
exports.PurchaseOrderService = PurchaseOrderService;
exports.PurchaseOrderService = PurchaseOrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        inventory_service_1.InventoryService])
], PurchaseOrderService);
//# sourceMappingURL=purchase-order.service.js.map