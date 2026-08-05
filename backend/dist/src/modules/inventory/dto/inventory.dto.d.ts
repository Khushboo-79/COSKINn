export declare class StockMovementDto {
    warehouseId: string;
    sku: string;
    quantity: number;
    reference?: string;
}
export declare class StockAdjustmentDto {
    warehouseId: string;
    sku: string;
    quantity: number;
    reason: string;
}
export declare class StockTransferDto {
    fromWarehouseId: string;
    toWarehouseId: string;
    sku: string;
    quantity: number;
}
export declare class DamagedStockDto {
    sku: string;
    quantity: number;
    reason?: string;
}
export declare class ExpiredStockDto {
    sku: string;
    batchNo: string;
    quantity: number;
}
