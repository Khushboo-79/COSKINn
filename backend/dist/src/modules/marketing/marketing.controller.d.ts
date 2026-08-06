import { MarketingService } from './marketing.service';
export declare class MarketingController {
    private readonly marketingService;
    constructor(marketingService: MarketingService);
    getPublicBanners(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
    }[]>;
    getBanners(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
    }[]>;
    createBanner(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
    }>;
    updateBanner(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
    }>;
    deleteBanner(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        startDate: Date | null;
        endDate: Date | null;
        title: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
    }>;
    getCoupons(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        code: string;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
        startDate: Date | null;
        endDate: Date | null;
    }[]>;
    createCoupon(data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        code: string;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    updateCoupon(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        code: string;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    deleteCoupon(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        code: string;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
        startDate: Date | null;
        endDate: Date | null;
    }>;
    getCampaigns(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        status: string;
        type: string;
        audience: string | null;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        scheduledAt: Date | null;
    }[]>;
    createCampaign(data: {
        name: string;
        type: string;
        audience?: string;
        scheduledAt?: Date;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        status: string;
        type: string;
        audience: string | null;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        scheduledAt: Date | null;
    }>;
    getAbandonedCarts(recovered?: string): Promise<({
        user: {
            id: string;
            email: string | null;
            phone: string | null;
            passwordHash: string | null;
            firstName: string | null;
            lastName: string | null;
            isActive: boolean;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            membershipTierId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        cartId: string;
        userId: string;
        recovered: boolean;
        emailSentAt: Date | null;
    })[]>;
    getDashboard(): Promise<{
        metrics: {
            label: string;
            value: string;
            change: string;
            icon: string;
            color: string;
            bg: string;
        }[];
        topCampaigns: {
            name: string;
            performance: number;
        }[];
    }>;
}
