"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const notification_service_1 = require("../notification/notification.service");
const crypto = __importStar(require("crypto"));
const razorpay_1 = __importDefault(require("razorpay"));
let PaymentService = class PaymentService {
    prisma;
    notificationService;
    razorpay;
    constructor(prisma, notificationService) {
        this.prisma = prisma;
        this.notificationService = notificationService;
        this.razorpay = new razorpay_1.default({
            key_id: process.env.RAZORPAY_KEY_ID || 'mock',
            key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock',
        });
    }
    async createRazorpayOrder(userId, orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId, userId },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (order.status !== 'DRAFT')
            throw new common_1.BadRequestException('Order is already processed');
        if (order.paymentMode !== 'ONLINE')
            throw new common_1.BadRequestException('Order is not marked for ONLINE payment');
        let razorpayOrderId = '';
        try {
            if (process.env.USE_MOCK_PAYMENT === 'true') {
                razorpayOrderId = `mock_order_${crypto.randomBytes(8).toString('hex')}`;
            }
            else {
                const options = {
                    amount: Math.round(order.finalAmount * 100),
                    currency: 'INR',
                    receipt: order.id,
                };
                const rzpOrder = await this.razorpay.orders.create(options);
                razorpayOrderId = rzpOrder.id;
            }
        }
        catch (error) {
            console.error('Razorpay order creation failed:', error);
            throw new common_1.BadRequestException('Failed to create payment gateway order');
        }
        await this.prisma.razorpayOrder.create({
            data: {
                rzpId: razorpayOrderId,
                amount: order.finalAmount,
                receipt: order.id,
                status: 'created',
            },
        });
        return {
            id: razorpayOrderId,
            amount: order.finalAmount * 100,
            currency: 'INR',
            receipt: order.id,
        };
    }
    async triggerRefund(razorpayOrderId, amount) {
        if (process.env.USE_MOCK_PAYMENT === 'true') {
            return {
                success: true,
                refundId: `mock_refund_${crypto.randomBytes(8).toString('hex')}`,
                paymentId: `mock_payment_${crypto.randomBytes(8).toString('hex')}`,
                amount: amount,
            };
        }
        try {
            const payments = await this.razorpay.orders.fetchPayments(razorpayOrderId);
            const payment = payments.items.find((p) => p.status === 'captured');
            if (!payment) {
                throw new common_1.BadRequestException('No captured payment found for this order to refund');
            }
            const refund = await this.razorpay.payments.refund(payment.id, {
                amount: Math.round(amount * 100),
            });
            return {
                success: true,
                refundId: refund.id,
                paymentId: payment.id,
                amount: refund.amount / 100,
            };
        }
        catch (error) {
            console.error('Razorpay refund failed:', error);
            throw new common_1.BadRequestException('Failed to process payment gateway refund');
        }
    }
    async handleWebhook(payload, signature) {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'mockedwebhooksecret';
        if (signature) {
            const generatedSignature = crypto
                .createHmac('sha256', secret)
                .update(JSON.stringify(payload))
                .digest('hex');
            if (generatedSignature !== signature) {
                throw new common_1.BadRequestException('Invalid webhook signature');
            }
        }
        else {
            if (process.env.USE_MOCK_PAYMENT !== 'true') {
                throw new common_1.BadRequestException('Webhook signature missing');
            }
        }
        const event = payload.event;
        if (event === 'payment.captured' || event === 'mock.payment.success') {
            const razorpayOrderId = payload.payload?.payment?.entity?.order_id || payload.order_id;
            const rzpOrder = await this.prisma.razorpayOrder.findUnique({
                where: { rzpId: razorpayOrderId },
            });
            if (!rzpOrder)
                return { status: 'ignored', reason: 'order not found' };
            await this.prisma.$transaction(async (tx) => {
                await tx.razorpayOrder.update({
                    where: { id: rzpOrder.id },
                    data: { status: 'paid' },
                });
                await tx.paymentTransaction.create({
                    data: {
                        razorpayOrderId: rzpOrder.rzpId,
                        amount: rzpOrder.amount,
                        status: 'SUCCESS',
                    },
                });
                if (rzpOrder.receipt) {
                    const updatedOrder = await tx.order.update({
                        where: { id: rzpOrder.receipt },
                        data: { status: 'PLACED' },
                        include: { user: true },
                    });
                    this.notificationService
                        .sendOrderConfirmation(updatedOrder.userId, updatedOrder.id, updatedOrder.user?.email || undefined, updatedOrder.user?.phone || undefined)
                        .catch((e) => console.error('Failed to send order notification', e));
                }
            });
            return { status: 'success' };
        }
        return { status: 'ignored' };
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notification_service_1.NotificationService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map