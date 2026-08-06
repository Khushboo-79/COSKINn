import { WarehouseService } from './warehouse.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
    getPurchaseOrders(): Promise<({
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            address: string | null;
        };
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            purchaseOrderId: string;
            requestedQty: number;
            unitPrice: number;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<{
        items: {
            id: string;
            createdAt: Date;
            sku: string;
            purchaseOrderId: string;
            requestedQty: number;
            unitPrice: number;
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
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    getBins(): Promise<({
        warehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            address: string | null;
        };
        stocks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            sku: string;
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
            code: string;
            address: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        description: string | null;
        code: string;
        warehouseId: string;
    }>;
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
    verifyBarcodeScan(dto: BarcodeScanDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getThroughputAnalytics(): Promise<any[]>;
}
