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
