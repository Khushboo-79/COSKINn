import { PrismaService } from '../../prisma/prisma.service';
import { RequestReturnDto, ProcessReturnDto, ReturnQcDto } from './dto/return.dto';
import { InventoryService } from '../inventory/inventory.service';
import { RefundService } from '../refund/refund.service';
export declare class ReturnService {
    private prisma;
    private inventoryService;
    private refundService;
    constructor(prisma: PrismaService, inventoryService: InventoryService, refundService: RefundService);
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
    requestReturn(dto: RequestReturnDto, userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        orderId: string;
        reason: string;
        refundType: string;
    }>;
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
