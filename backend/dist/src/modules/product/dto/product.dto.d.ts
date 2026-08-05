export declare class UpdateContentDto {
    howToUse?: string;
    warnings?: string;
    claims?: string;
    storageInstructions?: string;
    isReturnable?: boolean;
    isCodAvailable?: boolean;
    returnPolicy?: string;
    ingredients?: string[];
    benefits?: string[];
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    sku: string;
    categoryId: string;
    subcategoryId?: string;
    description?: string;
    mrp: number;
    discountPrice?: number;
}
export declare class UpdateProductDto {
    name?: string;
    description?: string;
    mrp?: number;
    discountPrice?: number;
    status?: string;
}
export declare class CreateVariantDto {
    sku: string;
    name: string;
    mrp: number;
    price: number;
    shadeCode?: string;
    fragrance?: string;
    flavor?: string;
}
export declare class UpdateVariantDto {
    sku?: string;
    name?: string;
    mrp?: number;
    price?: number;
    shadeCode?: string;
    fragrance?: string;
    flavor?: string;
}
export declare class UpdateTagsDto {
    ingredients?: string[];
    concerns?: string[];
    skinTypes?: string[];
    benefits?: string[];
}
export declare class CreateProductVideoDto {
    url: string;
    title?: string;
}
export declare class MediaOrderItemDto {
    id: string;
    sortOrder: number;
}
export declare class UpdateMediaOrderDto {
    images?: MediaOrderItemDto[];
    videos?: MediaOrderItemDto[];
}
export declare class UpdateComplianceDto {
    gstRate?: number;
    hsnCode?: string;
    manufacturerName?: string;
    manufacturerAddress?: string;
    countryOfOrigin?: string;
}
export declare class OpeningStockDto {
    batchNumber: string;
    manufacturingDate?: string;
    expiryDate?: string;
    quantity: number;
    netQuantity?: string;
}
