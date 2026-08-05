import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
import { PaymentService } from '../payment/payment.service';
import { ProcessRefundDto } from './dto/refund.dto';
export declare class RefundService {
    private prisma;
    private walletService;
    private paymentService;
    constructor(prisma: PrismaService, walletService: WalletService, paymentService: PaymentService);
    getAllRefunds(): Promise<({
        order: {
            id: string;
            user: {
                email: string | null;
                firstName: string | null;
            };
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        amount: number;
        orderId: string;
        method: string | null;
    })[]>;
    processRefund(dto: ProcessRefundDto, type: 'WALLET' | 'ORIGINAL_SOURCE'): Promise<{
        success: boolean;
        message: string;
    }>;
}
