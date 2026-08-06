import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(req: any): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    productId: string;
                    url: string;
                    sortOrder: number;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
            } & {
                hsnCode: string | null;
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                manufacturerName: string | null;
                manufacturerAddress: string | null;
                countryOfOrigin: string | null;
                storageInstructions: string | null;
                isReturnable: boolean;
                isCodAvailable: boolean;
                returnPolicy: string | null;
                testReportRef: string | null;
                status: import("@prisma/client").$Enums.ProductStatus;
                productLine: import("@prisma/client").$Enums.ProductLine;
                isCrossSegment: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            wishlistId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    addToWishlist(req: any, productId: string): Promise<{
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    productId: string;
                    url: string;
                    sortOrder: number;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
            } & {
                hsnCode: string | null;
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                manufacturerName: string | null;
                manufacturerAddress: string | null;
                countryOfOrigin: string | null;
                storageInstructions: string | null;
                isReturnable: boolean;
                isCodAvailable: boolean;
                returnPolicy: string | null;
                testReportRef: string | null;
                status: import("@prisma/client").$Enums.ProductStatus;
                productLine: import("@prisma/client").$Enums.ProductLine;
                isCrossSegment: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            wishlistId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    removeFromWishlist(req: any, productId: string): Promise<({
        items: ({
            product: {
                images: {
                    id: string;
                    createdAt: Date;
                    productId: string;
                    url: string;
                    sortOrder: number;
                    altText: string | null;
                    isPrimary: boolean;
                }[];
            } & {
                hsnCode: string | null;
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                manufacturerName: string | null;
                manufacturerAddress: string | null;
                countryOfOrigin: string | null;
                storageInstructions: string | null;
                isReturnable: boolean;
                isCodAvailable: boolean;
                returnPolicy: string | null;
                testReportRef: string | null;
                status: import("@prisma/client").$Enums.ProductStatus;
                productLine: import("@prisma/client").$Enums.ProductLine;
                isCrossSegment: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            wishlistId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }) | {
        success: boolean;
    }>;
}
