import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createRazorpayOrder(req: any, orderId: string): Promise<{
        id: string;
        amount: number;
        currency: string;
        receipt: string;
    }>;
    razorpayWebhook(payload: any, signature: string): Promise<{
        status: string;
        reason: string;
    } | {
        status: string;
        reason?: undefined;
    }>;
}
