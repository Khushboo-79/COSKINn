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
exports.RefundService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const wallet_service_1 = require("../wallet/wallet.service");
const payment_service_1 = require("../payment/payment.service");
let RefundService = class RefundService {
    prisma;
    walletService;
    paymentService;
    constructor(prisma, walletService, paymentService) {
        this.prisma = prisma;
        this.walletService = walletService;
        this.paymentService = paymentService;
    }
    async getAllRefunds() {
        return this.prisma.orderPayment.findMany({
            where: { method: { in: ['WALLET_REFUND', 'ORIGINAL_SOURCE_REFUND'] } },
            include: { order: { select: { id: true, user: { select: { email: true, firstName: true } } } } },
            orderBy: { createdAt: 'desc' }
        });
    }
    async processRefund(dto, type) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: { payments: true }
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (type === 'WALLET') {
            await this.walletService.creditWallet(order.userId, dto.amount, `Refund for Order ${order.id}`);
            await this.prisma.orderPayment.create({
                data: {
                    orderId: order.id,
                    status: 'SUCCESS',
                    amount: -dto.amount,
                    method: 'WALLET_REFUND'
                }
            });
            return { success: true, message: 'Refund credited to wallet' };
        }
        else {
            if (order.paymentMode === 'COD') {
                throw new common_1.BadRequestException('COD orders can only be refunded to Wallet');
            }
            const rzpOrder = await this.prisma.razorpayOrder.findFirst({
                where: { receipt: order.id, status: 'paid' },
                orderBy: { createdAt: 'desc' }
            });
            if (!rzpOrder) {
                throw new common_1.BadRequestException('No successful Razorpay payment found for this order to refund');
            }
            const refundResult = await this.paymentService.triggerRefund(rzpOrder.rzpId, dto.amount);
            await this.prisma.orderPayment.create({
                data: {
                    orderId: order.id,
                    status: 'SUCCESS',
                    amount: -dto.amount,
                    method: `REFUND_${refundResult.refundId}`
                }
            });
            return { success: true, message: `Refund processed to original source. Refund ID: ${refundResult.refundId}` };
        }
    }
};
exports.RefundService = RefundService;
exports.RefundService = RefundService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        wallet_service_1.WalletService,
        payment_service_1.PaymentService])
], RefundService);
//# sourceMappingURL=refund.service.js.map