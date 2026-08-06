import { PrismaService } from '../../prisma/prisma.service';
export declare class MarketingService {
    private prisma;
    constructor(prisma: PrismaService);
    getActiveBanners(): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getBanners(): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    createBanner(data: any): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateBanner(id: string, data: any): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteBanner(id: string): Promise<{
        id: string;
        title: string;
        imageUrl: string;
        linkUrl: string | null;
        position: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        sortOrder: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getCoupons(): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        description: string | null;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
    }[]>;
    createCoupon(data: any): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        description: string | null;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
    }>;
    updateCoupon(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        description: string | null;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
    }>;
    deleteCoupon(id: string): Promise<{
        id: string;
        isActive: boolean;
        startDate: Date | null;
        endDate: Date | null;
        createdAt: Date;
        updatedAt: Date;
        code: string;
        description: string | null;
        discountType: string;
        discountValue: number;
        minPurchase: number | null;
        maxDiscount: number | null;
        usageLimit: number | null;
        usedCount: number;
        perUserLimit: number | null;
    }>;
    getCampaigns(): Promise<{
        id: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        name: string;
        type: string;
        status: string;
        audience: string | null;
        scheduledAt: Date | null;
    }[]>;
    createCampaign(data: {
        name: string;
        type: string;
        audience?: string;
        scheduledAt?: Date;
    }): Promise<{
        id: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        name: string;
        type: string;
        status: string;
        audience: string | null;
        scheduledAt: Date | null;
    }>;
    scheduleCampaign(id: string, scheduledAt: Date): Promise<{
        id: string;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        name: string;
        type: string;
        status: string;
        audience: string | null;
        scheduledAt: Date | null;
    }>;
    logAbandonedCart(userId: string, cartId: string): Promise<{
        id: string;
        createdAt: Date;
        recovered: boolean;
        emailSentAt: Date | null;
        userId: string;
        cartId: string;
    }>;
    getAbandonedCarts(recovered?: boolean): Promise<({
        user: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            passwordHash: string | null;
            firstName: string | null;
            lastName: string | null;
            isDeleted: boolean;
            deletedAt: Date | null;
            membershipTierId: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        recovered: boolean;
        emailSentAt: Date | null;
        userId: string;
        cartId: string;
    })[]>;
    getDashboardOverview(): Promise<{
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
