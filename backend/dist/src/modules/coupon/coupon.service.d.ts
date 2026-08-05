import { PrismaService } from '../../prisma/prisma.service';
export declare class CouponService {
    private prisma;
    constructor(prisma: PrismaService);
    applyCoupon(userId: string, code: string): Promise<{
        message: string;
        code: string;
        discountAmount: number;
        newTotal: number;
    }>;
    getAvailableCoupons(userId: string): Promise<{
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
    getAdminCoupons(): Promise<{
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
}
