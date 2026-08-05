import { CouponService } from './coupon.service';
export declare class CouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
    applyCoupon(req: any, code: string): Promise<{
        message: string;
        code: string;
        discountAmount: number;
        newTotal: number;
    }>;
    getAvailableCoupons(req: any): Promise<{
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
}
export declare class AdminCouponController {
    private readonly couponService;
    constructor(couponService: CouponService);
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
