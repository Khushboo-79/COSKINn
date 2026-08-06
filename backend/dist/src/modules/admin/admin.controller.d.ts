import { AdminService } from './admin.service';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getOverview(platform?: 'COSMETICS' | 'SKINCARE'): Promise<{
        totalRevenue: number;
        activeUsers: number;
        totalOrders: number;
        totalProducts: number;
        systemHealth: string;
        revenueTrend: string;
        usersTrend: string;
        ordersTrend: string;
    }>;
    getRoles(): Promise<{
        isOnline: boolean;
        lastActiveAt: Date | null;
        lastLoginAt: Date | null;
        createdByName: string | null;
        updatedByName: string | null;
        _count: {
            users: number;
        };
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        panelAccess: string[];
        createdById: string | null;
        updatedById: string | null;
    }[]>;
    createRole(req: any, body: {
        name: string;
        description?: string;
        panelAccess: string[];
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        panelAccess: string[];
        createdById: string | null;
        updatedById: string | null;
    }>;
    updateRole(id: string, req: any, body: UpdateRoleDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        panelAccess: string[];
        createdById: string | null;
        updatedById: string | null;
    }>;
    updateRolePanelAccess(id: string, req: any, body: {
        panelAccess: string[];
    }): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        panelAccess: string[];
        createdById: string | null;
        updatedById: string | null;
    }>;
    getUsers(): Promise<({
        roles: ({
            role: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                description: string | null;
                panelAccess: string[];
                createdById: string | null;
                updatedById: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            roleId: string;
        })[];
        sessions: {
            id: string;
            createdAt: Date;
            isRevoked: boolean;
            userId: string;
            refreshToken: string;
            deviceInfo: string | null;
            ipAddress: string | null;
            expiresAt: Date;
        }[];
        customerProfile: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            dateOfBirth: Date | null;
            gender: string | null;
            avatar: string | null;
        } | null;
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            isDefault: boolean;
            type: string;
            fullName: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string;
            pincode: string;
            country: string;
        }[];
        orders: {
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
        }[];
        wishlist: ({
            items: {
                id: string;
                createdAt: Date;
                wishlistId: string;
                productId: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
        }) | null;
        cart: ({
            items: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                productId: string;
                cartId: string;
                variantId: string | null;
                quantity: number;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            sessionId: string | null;
        }) | null;
        rewardPoints: {
            id: string;
            createdAt: Date;
            userId: string;
            type: string;
            points: number;
            reference: string | null;
        }[];
        membershipTier: {
            id: string;
            createdAt: Date;
            name: string;
            minSpend: number;
            multiplier: number;
        } | null;
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
    })[]>;
    deleteUser(id: string): Promise<{
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
    createStaffUser(body: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        roleId: string;
    }): Promise<{
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
    updateUserRole(id: string, body: {
        roleId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    }>;
    assignRole(body: {
        userId: string;
        roleName: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        roleId: string;
    }>;
    getStaff2FAStatus(): Promise<{
        id: string;
        name: string;
        email: string | null;
        is2FAEnabled: boolean;
        lastLogin: string;
    }[]>;
    resetStaff2FA(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    getSettings(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        returnWindowDays: number;
        autoCancelHours: number;
        codEnabled: boolean;
        maxCodAmount: number;
    } | null>;
    updateSettings(body: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        returnWindowDays: number;
        autoCancelHours: number;
        codEnabled: boolean;
        maxCodAmount: number;
    }>;
    getNotifications(): Promise<any[]>;
}
