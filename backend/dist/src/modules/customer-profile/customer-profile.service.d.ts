import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
export declare class CustomerProfileService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
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
            profileId: string;
            skinType: string | null;
            skinConcerns: string[];
        } | null;
        makeupPreference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            makeupStyle: string | null;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        dateOfBirth: Date | null;
        gender: string | null;
        avatar: string | null;
    }>;
    upsertProfile(userId: string, dto: UpdateCustomerProfileDto): Promise<{
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
            profileId: string;
            skinType: string | null;
            skinConcerns: string[];
        } | null;
        makeupPreference: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            profileId: string;
            makeupStyle: string | null;
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        dateOfBirth: Date | null;
        gender: string | null;
        avatar: string | null;
    } | null>;
    getAllCustomers(page: number, limit: number, search?: string, platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        data: ({
            customerProfile: ({
                skinProfile: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    profileId: string;
                    skinType: string | null;
                    skinConcerns: string[];
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
    getCustomer360(userId: string, platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        customerProfile: ({
            skinProfile: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                profileId: string;
                skinType: string | null;
                skinConcerns: string[];
            } | null;
            makeupPreference: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                profileId: string;
                makeupStyle: string | null;
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
        wishlist: ({
            items: ({
                product: {
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
                wishlistId: string;
                productId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }) | null;
        orders: ({
            items: {
                id: string;
                createdAt: Date;
                name: string;
                taxAmount: number;
                orderId: string;
                variantId: string;
                sku: string;
                quantity: number;
                price: number;
                total: number;
            }[];
        } & {
            id: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            platform: import("@prisma/client").$Enums.PlatformType;
            status: string;
            totalAmount: number;
            discountAmt: number;
            taxAmount: number;
            shippingFee: number;
            finalAmount: number;
            paymentMode: string;
            couponId: string | null;
        })[];
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
    updateUserStatus(userId: string, isActive: boolean): Promise<{
        success: boolean;
        isActive: boolean;
    }>;
    sendResetPasswordLink(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getAddresses(userId: string): Promise<{
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
    addAddress(userId: string, data: any): Promise<{
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
    updateAddress(userId: string, id: string, data: any): Promise<{
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
    deleteAddress(userId: string, id: string): Promise<{
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
    deleteMyAccount(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
