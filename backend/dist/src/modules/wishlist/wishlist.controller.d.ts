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
                    altText: string | null;
                    isPrimary: boolean;
                    sortOrder: number;
                }[];
            } & {
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                description: string | null;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                hsnCode: string | null;
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
                isBestseller: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string;
            wishlistId: string;
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
                    altText: string | null;
                    isPrimary: boolean;
                    sortOrder: number;
                }[];
            } & {
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                description: string | null;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                hsnCode: string | null;
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
                isBestseller: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string;
            wishlistId: string;
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
                    altText: string | null;
                    isPrimary: boolean;
                    sortOrder: number;
                }[];
            } & {
                id: string;
                isDeleted: boolean;
                deletedAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                categoryId: string;
                subcategoryId: string | null;
                slug: string;
                description: string | null;
                howToUse: string | null;
                warnings: string | null;
                claims: string | null;
                mrp: number;
                discountPrice: number | null;
                gstRate: number;
                hsnCode: string | null;
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
                isBestseller: boolean;
                rejectionReason: string | null;
                seoTitle: string | null;
                seoDesc: string | null;
                seoKeywords: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            productId: string;
            wishlistId: string;
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
