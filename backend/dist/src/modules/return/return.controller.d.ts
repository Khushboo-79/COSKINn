import { ReturnService } from './return.service';
import { RequestReturnDto, ProcessReturnDto, ReturnQcDto } from './dto/return.dto';
export declare class ReturnController {
    private readonly returnService;
    constructor(returnService: ReturnService);
    requestReturn(dto: RequestReturnDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        reason: string;
        refundType: string;
    }>;
    findAll(status?: string): Promise<({
        order: {
            user: {
                email: string | null;
                firstName: string | null;
            };
            id: string;
        };
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            quantity: number;
            returnId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        reason: string;
        refundType: string;
    })[]>;
    processReturn(id: string, dto: ProcessReturnDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        reason: string;
        refundType: string;
    }>;
    processQC(id: string, dto: ReturnQcDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        reason: string;
        refundType: string;
    }>;
}
