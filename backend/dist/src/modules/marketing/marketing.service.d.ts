import { PrismaService } from '../../prisma/prisma.service';
export declare class MarketingService {
    private prisma;
    constructor(prisma: PrismaService);
    getActiveBanners(): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string;
        sortOrder: number;
        title: string;
        startDate: Date | null;
        endDate: Date | null;
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
        title: string;
        startDate: Date | null;
        endDate: Date | null;
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
        title: string;
        startDate: Date | null;
        endDate: Date | null;
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
        title: string;
        startDate: Date | null;
        endDate: Date | null;
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
        title: string;
        startDate: Date | null;
        endDate: Date | null;
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
    scheduleCampaign(id: string, scheduledAt: Date): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        status: string;
        type: string;
        audience: string | null;
        targetSegment: import("@prisma/client").$Enums.ProductLine;
        scheduledAt: Date | null;
    }>;
    logAbandonedCart(userId: string, cartId: string): Promise<{
        id: string;
        createdAt: Date;
        cartId: string;
        userId: string;
        recovered: boolean;
        emailSentAt: Date | null;
    }>;
    getAbandonedCarts(recovered?: boolean): Promise<({
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
