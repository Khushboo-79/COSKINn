import { PrismaService } from '../../prisma/prisma.service';
import { OfferService } from '../offer/offer.service';
import { WalletService } from '../wallet/wallet.service';
import { RewardPointService } from '../reward-point/reward-point.service';
export declare class CartService {
    private prisma;
    private offerService;
    private walletService;
    private rewardPointService;
    constructor(prisma: PrismaService, offerService: OfferService, walletService: WalletService, rewardPointService: RewardPointService);
    getCart(userId: string): Promise<{
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
            cartId: string;
            variantId: string | null;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    addToCart(userId: string, productId: string, variantId?: string, quantity?: number): Promise<{
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
            cartId: string;
            variantId: string | null;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    updateCartItem(userId: string, itemId: string, quantity: number): Promise<{
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
            cartId: string;
            variantId: string | null;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    removeFromCart(userId: string, itemId: string): Promise<{
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
            cartId: string;
            variantId: string | null;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
    clearCart(userId: string): Promise<{
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
            cartId: string;
            variantId: string | null;
            quantity: number;
        })[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        sessionId: string | null;
    }>;
}
