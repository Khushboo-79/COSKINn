import { CustomerProfileService } from './customer-profile.service';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
export declare class CustomerProfileController {
    private readonly profileService;
    constructor(profileService: CustomerProfileService);
    getProfile(req: any): Promise<{
        id: null;
        userId: string;
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        skinProfile: null;
        makeupPreference: null;
        avatar: null;
    } | {
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        user: {
            email: string | null;
            phone: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        skinProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skinType: string | null;
            skinConcerns: string[];
            profileId: string;
        } | null;
        makeupPreference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            makeupStyle: string | null;
            profileId: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        dateOfBirth: Date | null;
        gender: string | null;
        avatar: string | null;
    }>;
    saveSkinQuiz(req: any, dto: any): Promise<{
        message: string;
        recommendationsUrl: string;
    }>;
    updateProfile(req: any, dto: UpdateCustomerProfileDto): Promise<{
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        user: {
            email: string | null;
            phone: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        skinProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            skinType: string | null;
            skinConcerns: string[];
            profileId: string;
        } | null;
        makeupPreference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            makeupStyle: string | null;
            profileId: string;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        dateOfBirth: Date | null;
        gender: string | null;
        avatar: string | null;
    } | null>;
    deleteMyAccount(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getAddresses(req: any): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        fullName: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
        isDefault: boolean;
    }[]>;
    checkServiceability(pincode: string): Promise<{
        serviceable: boolean;
        codAvailable: boolean;
        message: string;
    }>;
    addAddress(req: any, dto: any): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        fullName: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
        isDefault: boolean;
    }>;
    updateAddress(req: any, id: string, dto: any): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        fullName: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
        isDefault: boolean;
    }>;
    deleteAddress(req: any, id: string): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        type: string;
        fullName: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string;
        pincode: string;
        country: string;
        isDefault: boolean;
    }>;
    getAllCustomers(page?: number, limit?: number, search?: string, platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        data: ({
            customerProfile: ({
                skinProfile: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    skinType: string | null;
                    skinConcerns: string[];
                    profileId: string;
                } | null;
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                dateOfBirth: Date | null;
                gender: string | null;
                avatar: string | null;
            }) | null;
        } & {
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getCustomer360(id: string, platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        customerProfile: ({
            skinProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                skinType: string | null;
                skinConcerns: string[];
                profileId: string;
            } | null;
            makeupPreference: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                makeupStyle: string | null;
                profileId: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            dateOfBirth: Date | null;
            gender: string | null;
            avatar: string | null;
        }) | null;
        orders: ({
            items: {
                id: string;
                createdAt: Date;
                name: string;
                variantId: string;
                quantity: number;
                sku: string;
                price: number;
                total: number;
                taxAmount: number;
                orderId: string;
            }[];
        } & {
            id: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            status: string;
            platform: import("@prisma/client").$Enums.PlatformType;
            userId: string;
            totalAmount: number;
            discountAmt: number;
            taxAmount: number;
            shippingFee: number;
            finalAmount: number;
            paymentMode: string;
            couponId: string | null;
        })[];
        wishlist: ({
            items: ({
                product: {
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
                productId: string;
                wishlistId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }) | null;
    } & {
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
    }>;
    blockUser(id: string): Promise<{
        success: boolean;
        isActive: boolean;
    }>;
    unblockUser(id: string): Promise<{
        success: boolean;
        isActive: boolean;
    }>;
    sendResetPasswordLink(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
