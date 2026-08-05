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
        items: {
            id: string;
            createdAt: Date;
            quantity: number;
            sku: string;
            returnId: string;
        }[];
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
