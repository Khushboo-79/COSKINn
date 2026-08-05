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
            roleId: string;
            userId: string;
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
    })[]>;
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
        roleId: string;
        userId: string;
    }>;
    assignRole(body: {
        userId: string;
        roleName: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        roleId: string;
        userId: string;
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
