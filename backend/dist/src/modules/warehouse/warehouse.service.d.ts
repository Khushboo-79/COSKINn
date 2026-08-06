import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';
export declare class WarehouseService {
    private prisma;
    private inventoryService;
    constructor(prisma: PrismaService, inventoryService: InventoryService);
    createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<{
        items: {
            sku: string;
            id: string;
            createdAt: Date;
            requestedQty: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
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
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    }>;
    getPurchaseOrders(): Promise<({
        warehouse: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
        items: {
            sku: string;
            id: string;
            createdAt: Date;
            requestedQty: number;
            unitPrice: number;
            purchaseOrderId: string;
        }[];
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
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createGrn(dto: CreateGrnDto): Promise<{
        items: {
            sku: string;
            id: string;
            createdAt: Date;
            reason: string | null;
            receivedQty: number;
            acceptedQty: number;
            rejectedQty: number;
            grnId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        receivedDate: Date;
        purchaseOrderId: string;
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
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
        stocks: {
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        }[];
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        code: string;
        warehouseId: string;
    })[]>;
    createBin(dto: {
        warehouseId: string;
        code: string;
        description?: string;
    }): Promise<{
        warehouse: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
    } & {
        description: string | null;
        id: string;
        createdAt: Date;
        code: string;
        warehouseId: string;
    }>;
    verifyBarcodeScan(dto: BarcodeScanDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getThroughputAnalytics(days?: number): Promise<any[]>;
}
