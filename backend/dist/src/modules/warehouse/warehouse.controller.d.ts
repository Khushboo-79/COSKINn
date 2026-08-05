import { WarehouseService } from './warehouse.service';
import { GeneratePickListDto, BarcodeScanDto, CreatePurchaseOrderDto, CreateGrnDto } from './dto/warehouse.dto';
export declare class WarehouseController {
    private readonly warehouseService;
    constructor(warehouseService: WarehouseService);
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
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createPurchaseOrder(dto: CreatePurchaseOrderDto): Promise<{
        items: {
            sku: string;
            id: string;
            createdAt: Date;
            requestedQty: number;
            unitPrice: number;
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
    getBins(): Promise<({
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
    verifyBarcodeScan(dto: BarcodeScanDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
