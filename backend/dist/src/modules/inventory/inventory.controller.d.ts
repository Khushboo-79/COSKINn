import { InventoryService } from './inventory.service';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getWarehouses(): Promise<({
        bins: {
            description: string | null;
            id: string;
            createdAt: Date;
            code: string;
            warehouseId: string;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        address: string | null;
    })[]>;
    createWarehouse(dto: any): Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        address: string | null;
    }>;
    getMovementLogs(sku?: string): Promise<({
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
        sku: string;
        id: string;
        quantity: number;
        createdAt: Date;
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
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
    } & {
        sku: string;
        id: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
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
        fromWarehouse: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            code: string;
            address: string | null;
        };
        toWarehouse: {
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
            quantity: number;
            createdAt: Date;
            transferId: string;
        }[];
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            warehouseId: string;
            type: string;
            reference: string | null;
        };
        stock: {
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        };
    }>;
    adjustStock(dto: import('./dto/inventory.dto').StockAdjustmentDto): Promise<{
        adjustment: {
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            warehouseId: string;
            reason: string;
        };
        stock: {
            sku: string;
            id: string;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
            warehouseId: string;
            reservedQty: number;
            binLocationId: string | null;
        };
    }>;
    transferStock(dto: import('./dto/inventory.dto').StockTransferDto): Promise<{
        success: boolean;
        message: string;
        transfer: {
            status: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            fromWarehouseId: string;
            toWarehouseId: string;
            requestedBy: string | null;
        };
    }>;
    reportDamaged(dto: import('./dto/inventory.dto').DamagedStockDto): Promise<{
        sku: string;
        id: string;
        quantity: number;
        createdAt: Date;
        reason: string | null;
    }>;
    reportExpired(dto: import('./dto/inventory.dto').ExpiredStockDto): Promise<{
        sku: string;
        id: string;
        quantity: number;
        createdAt: Date;
        batchNo: string;
    }>;
    getLowStock(): Promise<({
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
        sku: string;
        id: string;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        reservedQty: number;
        binLocationId: string | null;
    })[]>;
    getNearExpiry(): Promise<{
        sku: string;
        id: string;
        batchNumber: string;
        expiryDate: Date | null;
        createdAt: Date;
        mfgDate: Date | null;
    }[]>;
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
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    })[]>;
    createPurchaseOrder(dto: {
        warehouseId: string;
        status: string;
    }): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        warehouseId: string;
        supplierId: string | null;
    } | {
        success: boolean;
        message: string;
    }>;
    getReturns(): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        reason: string;
        orderId: string;
        refundType: string;
    }[]>;
}
