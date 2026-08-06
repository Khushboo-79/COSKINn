import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getWarehouses(): Promise<({
        bins: {
            id: string;
            createdAt: Date;
            description: string | null;
            code: string;
            warehouseId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        address: string | null;
    })[]>;
    createWarehouse(dto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        address: string | null;
    }>;
    getMovementLogs(sku?: string): Promise<({
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
        quantity: number;
        sku: string;
        warehouseId: string;
        type: string;
        reference: string | null;
    })[]>;
    getDashboardStats(): Promise<{
        kpis: {
            totalSkus: {
                value: number;
                trend: string;
                trendUp: boolean;
            };
            inStock: {
                value: string;
                trend: string;
                trendUp: boolean;
            };
            lowStock: {
                value: number;
                trend: string;
                trendUp: boolean;
            };
            outOfStock: {
                value: number;
                trend: string;
                trendUp: boolean;
            };
            pendingPos: {
                value: number;
                subtext: string;
            };
        };
        stockStatusData: {
            name: string;
            value: number;
            color: string;
        }[];
        recentActivity: {
            id: string;
            name: string;
            desc: string;
            qty: string;
            time: string;
            type: string;
        }[];
        warehouseSummary: {
            id: string;
            name: string;
            items: number;
        }[];
        suppliersData: {
            totalSuppliers: number;
            openPos: number;
            goodsInTransit: number;
        };
    }>;
    getGlobalStock(platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        sku: string;
        name: string;
        totalQuantity: any;
        totalReservedQty: any;
        damaged: number;
        expired: number;
        warehouses: any;
    }[]>;
    getStockForSku(sku: string): Promise<({
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
        updatedAt: Date;
        quantity: number;
        sku: string;
        warehouseId: string;
        reservedQty: number;
        binLocationId: string | null;
    })[] | {
        id: string;
        warehouseId: string;
        sku: string;
        quantity: number;
        reservedQty: number;
        createdAt: Date;
        updatedAt: Date;
        warehouse: {
            id: string;
            name: string;
            code: string;
            address: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }[]>;
    getTransfers(): Promise<({
        items: {
            id: string;
            createdAt: Date;
            quantity: number;
            sku: string;
            transferId: string;
        }[];
        fromWarehouse: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            code: string;
            address: string | null;
        };
        toWarehouse: {
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
        updatedAt: Date;
        status: string;
        fromWarehouseId: string;
        toWarehouseId: string;
        requestedBy: string | null;
    })[]>;
    getDetailedStock(): Promise<{
        sku: string;
        name: string | undefined;
        warehouseName: string;
        available: number;
        reserved: number;
    }[]>;
    stockIn(dto: import('./dto/inventory.dto').StockMovementDto): Promise<{
        movement: any;
        stock: any;
    }>;
    stockOut(dto: import('./dto/inventory.dto').StockMovementDto): Promise<{
        movement: {
            id: string;
            createdAt: Date;
            quantity: number;
            sku: string;
            warehouseId: string;
            type: string;
            reference: string | null;
        };
        stock: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            sku: string;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        };
    }>;
    adjustStock(dto: import('./dto/inventory.dto').StockAdjustmentDto): Promise<{
        adjustment: {
            id: string;
            createdAt: Date;
            quantity: number;
            sku: string;
            warehouseId: string;
            reason: string;
        };
        stock: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quantity: number;
            sku: string;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        };
    }>;
    transferStock(dto: import('./dto/inventory.dto').StockTransferDto): Promise<{
        success: boolean;
        message: string;
        transfer: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            fromWarehouseId: string;
            toWarehouseId: string;
            requestedBy: string | null;
        };
    }>;
    reportDamaged(dto: import('./dto/inventory.dto').DamagedStockDto): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        sku: string;
        reason: string | null;
    }>;
    reportExpired(dto: import('./dto/inventory.dto').ExpiredStockDto): Promise<{
        id: string;
        createdAt: Date;
        quantity: number;
        sku: string;
        batchNo: string;
    }>;
    getLowStock(): Promise<({
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
        updatedAt: Date;
        quantity: number;
        sku: string;
        warehouseId: string;
        reservedQty: number;
        binLocationId: string | null;
    })[]>;
    getNearExpiry(): Promise<{
        id: string;
        createdAt: Date;
        sku: string;
        batchNumber: string;
        expiryDate: Date | null;
        mfgDate: Date | null;
    }[]>;
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createPurchaseOrder(dto: {
        warehouseId: string;
        status: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    }>;
    updatePurchaseOrder(id: string, dto: {
        status: string;
        items?: {
            sku: string;
            quantity: number;
        }[];
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        warehouseId: string;
        supplierId: string | null;
    } | {
        success: boolean;
        message: string;
    }>;
    getReturns(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        reason: string;
        orderId: string;
        refundType: string;
    }[]>;
}
