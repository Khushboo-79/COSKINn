import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { CreatePurchaseOrderDto, CreateGrnDto } from './dto/purchase-order.dto';
export declare class PurchaseOrderService {
    private prisma;
    private inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    create(dto: CreatePurchaseOrderDto): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    }>;
    findAll(): Promise<({
        warehouse: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
        supplier: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            address: string | null;
            gstin: string | null;
            contactPerson: string | null;
            email: string | null;
            phone: string | null;
            paymentTerms: string | null;
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            receivedDate: Date;
            purchaseOrderId: string;
        }[];
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        warehouse: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
        supplier: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            address: string | null;
            gstin: string | null;
            contactPerson: string | null;
            email: string | null;
            phone: string | null;
            paymentTerms: string | null;
        } | null;
        grns: {
            id: string;
            createdAt: Date;
            receivedDate: Date;
            purchaseOrderId: string;
        }[];
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    }>;
    createGrn(dto: CreateGrnDto): Promise<{
        id: string;
        createdAt: Date;
        receivedDate: Date;
        purchaseOrderId: string;
    }>;
}
