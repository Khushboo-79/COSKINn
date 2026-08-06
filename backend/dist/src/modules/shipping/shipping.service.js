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
exports.ShippingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const order_service_1 = require("../order/order.service");
let ShippingService = class ShippingService {
    prisma;
    orderService;
    constructor(prisma, orderService) {
        this.prisma = prisma;
        this.orderService = orderService;
    }
    async checkServiceability(dto) {
        const isServiceable = !dto.pincode.startsWith('999');
        const estimatedDays = isServiceable
            ? Math.floor(Math.random() * 5) + 2
            : null;
        const shippingFee = isServiceable ? 50 : null;
        return {
            pincode: dto.pincode,
            serviceable: isServiceable,
            estimatedDeliveryDays: estimatedDays,
            shippingFee,
            provider: 'ShadowFox',
        };
    }
    async createShipment(dto, adminId) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: { address: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
            throw new common_1.BadRequestException('Order is already shipped or delivered');
        }
        const awb = `SFX${Math.floor(Math.random() * 1000000000)}`;
        const labelUrl = `https://shadowfox.com/labels/${awb}.pdf`;
        await this.prisma.orderShipment.create({
            data: {
                orderId: dto.orderId,
                awbNumber: awb,
                courierPartner: 'ShadowFox',
                status: 'MANIFESTED',
                shippedAt: new Date(),
            },
        });
        await this.orderService.updateOrderStatus(dto.orderId, 'SHIPPED', adminId, `Order shipped via ShadowFox. AWB: ${awb}`);
        return {
            success: true,
            orderId: dto.orderId,
            awb,
            labelUrl,
        };
    }
    async getOrderShipments(orderId) {
        return this.prisma.orderShipment.findMany({
            where: { orderId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getAllShipments() {
        return this.prisma.orderShipment.findMany({
            include: {
                order: {
                    include: { address: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.ShippingService = ShippingService;
exports.ShippingService = ShippingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        order_service_1.OrderService])
], ShippingService);
//# sourceMappingURL=shipping.service.js.map