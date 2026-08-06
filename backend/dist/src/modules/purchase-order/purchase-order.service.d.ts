import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreatePurchaseOrderDto, CreateGrnDto } from './dto/purchase-order.dto';
export declare class PurchaseOrderService {
    private prisma;
    private inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    create(dto: CreatePurchaseOrderDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    findAll(): Promise<({
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            code: string;
        };
        supplier: {
            id: string;
            email: string | null;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            gstin: string | null;
            contactPerson: string | null;
            paymentTerms: string | null;
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            purchaseOrderId: string;
            receivedDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            code: string;
        };
        supplier: {
            id: string;
            email: string | null;
            phone: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            gstin: string | null;
            contactPerson: string | null;
            paymentTerms: string | null;
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            purchaseOrderId: string;
            receivedDate: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    createGrn(dto: CreateGrnDto): Promise<{
        id: string;
        createdAt: Date;
        purchaseOrderId: string;
        receivedDate: Date;
    }>;
}
