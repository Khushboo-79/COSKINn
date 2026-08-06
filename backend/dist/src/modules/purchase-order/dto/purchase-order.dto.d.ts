export declare class CreatePurchaseOrderDto {
    warehouseId: string;
    supplierId?: string;
    status?: string;
}
export declare class CreateGrnDto {
    purchaseOrderId: string;
    items: GrnItemDto[];
}
export declare class GrnItemDto {
    sku: string;
    quantity: number;
}
