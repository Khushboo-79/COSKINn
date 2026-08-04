export declare class GeneratePickListDto {
    orderIds: string[];
}
export declare class BarcodeScanDto {
    orderId: string;
    barcode: string;
}
export declare class CreatePurchaseOrderItemDto {
    sku: string;
    requestedQty: number;
    unitPrice: number;
}
export declare class CreatePurchaseOrderDto {
    warehouseId: string;
    vendorId?: string;
    items: CreatePurchaseOrderItemDto[];
}
export declare class CreateGrnItemDto {
    sku: string;
    receivedQty: number;
    acceptedQty: number;
    rejectedQty: number;
    reason?: string;
}
export declare class CreateGrnDto {
    purchaseOrderId: string;
    items: CreateGrnItemDto[];
}
