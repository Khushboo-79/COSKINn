import { PrismaService } from '../../prisma/prisma.service';
import { NotificationService } from '../notification/notification.service';
export declare class PaymentService {
    private prisma;
    private notificationService;
    private razorpay;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    createRazorpayOrder(userId: string, orderId: string): Promise<{
        id: string;
        amount: number;
        currency: string;
        receipt: string;
    }>;
    triggerRefund(razorpayOrderId: string, amount: number): Promise<{
        success: boolean;
        refundId: any;
        paymentId: any;
        amount: number;
    }>;
    handleWebhook(payload: any, signature?: string): Promise<{
        status: string;
        reason: string;
    } | {
        status: string;
        reason?: undefined;
    }>;
}
