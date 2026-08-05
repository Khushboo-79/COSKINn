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
    requestReturn(dto: RequestReturnDto, userId: string): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    }>;
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
