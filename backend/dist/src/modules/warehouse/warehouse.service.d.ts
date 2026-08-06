import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';
export declare class WarehouseService {
    private prisma;
    private inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<{
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
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            purchaseOrderId: string;
            requestedQty: number;
            unitPrice: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    getPurchaseOrders(): Promise<({
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
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            purchaseOrderId: string;
            requestedQty: number;
            unitPrice: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createGrn(dto: CreateGrnDto): Promise<{
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            reason: string | null;
            receivedQty: number;
            acceptedQty: number;
            rejectedQty: number;
            grnId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        purchaseOrderId: string;
        receivedDate: Date;
    }>;
    generatePickList(dto: GeneratePickListDto): Promise<{
        orderIds: string[];
        aggregatedItems: {
            sku: string;
            quantity: number;
        }[];
    }>;
    getBins(warehouseId?: string): Promise<({
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            code: string;
        };
        stocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sku: string;
            quantity: number;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
        warehouseId: string;
    })[]>;
    createBin(dto: {
        warehouseId: string;
        code: string;
        description?: string;
    }): Promise<{
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            address: string | null;
            code: string;
        };
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
        warehouseId: string;
    }>;
    verifyBarcodeScan(dto: BarcodeScanDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getThroughputAnalytics(days?: number): Promise<any[]>;
}
