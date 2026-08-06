import { CartService } from './cart.service';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(req: any): Promise<{
        autoAddedGifts: any[];
        summary: {
            totalMrp: number;
            totalDiscountPrice: number;
            totalSavings: number;
            offerDiscount: number;
            appliedOffer: any;
            tieredOffers: any[];
            finalTotal: number;
            walletBalance: number;
            rewardPointsBalance: number;
        };
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
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            quantity: number;
            cartId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    addToCart(req: any, productId: string, variantId?: string, quantity?: number): Promise<{
        autoAddedGifts: any[];
        summary: {
            totalMrp: number;
            totalDiscountPrice: number;
            totalSavings: number;
            offerDiscount: number;
            appliedOffer: any;
            tieredOffers: any[];
            finalTotal: number;
            walletBalance: number;
            rewardPointsBalance: number;
        };
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
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            quantity: number;
            cartId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    updateCartItem(req: any, itemId: string, quantity: number): Promise<{
        autoAddedGifts: any[];
        summary: {
            totalMrp: number;
            totalDiscountPrice: number;
            totalSavings: number;
            offerDiscount: number;
            appliedOffer: any;
            tieredOffers: any[];
            finalTotal: number;
            walletBalance: number;
            rewardPointsBalance: number;
        };
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
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            quantity: number;
            cartId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    removeFromCart(req: any, itemId: string): Promise<{
        autoAddedGifts: any[];
        summary: {
            totalMrp: number;
            totalDiscountPrice: number;
            totalSavings: number;
            offerDiscount: number;
            appliedOffer: any;
            tieredOffers: any[];
            finalTotal: number;
            walletBalance: number;
            rewardPointsBalance: number;
        };
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
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            quantity: number;
            cartId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    clearCart(req: any): Promise<{
        autoAddedGifts: any[];
        summary: {
            totalMrp: number;
            totalDiscountPrice: number;
            totalSavings: number;
            offerDiscount: number;
            appliedOffer: any;
            tieredOffers: any[];
            finalTotal: number;
            walletBalance: number;
            rewardPointsBalance: number;
        };
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
            updatedAt: Date;
            productId: string;
            variantId: string | null;
            quantity: number;
            cartId: string;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
}
