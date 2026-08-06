import { ReturnService } from './return.service';
import { RequestReturnDto, ProcessReturnDto, ReturnQcDto } from './dto/return.dto';
export declare class ReturnController {
    private readonly returnService;
    constructor(returnService: ReturnService);
    requestReturn(dto: RequestReturnDto, req: any): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    }>;
    findAll(status?: string): Promise<({
        order: {
            id: string;
            user: {
                email: string | null;
                firstName: string | null;
            };
        };
        items: {
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            returnId: string;
        }[];
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    })[]>;
    processReturn(id: string, dto: ProcessReturnDto): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    }>;
    processQC(id: string, dto: ReturnQcDto): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    }>;
}
