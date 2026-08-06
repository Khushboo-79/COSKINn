import { RefundService } from './refund.service';
import { ProcessRefundDto } from './dto/refund.dto';
export declare class RefundController {
    private readonly refundService;
    constructor(refundService: RefundService);
    getAllRefunds(): Promise<({
        order: {
            user: {
                email: string | null;
                firstName: string | null;
            };
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        amount: number;
        method: string | null;
    })[]>;
    processWalletRefund(dto: ProcessRefundDto): Promise<{
        success: boolean;
        message: string;
    }>;
    processOriginalSourceRefund(dto: ProcessRefundDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
