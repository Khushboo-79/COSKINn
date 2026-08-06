"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const roleCount = await this.prisma.role.count();
        if (roleCount === 0) {
            const roles = [
                { name: 'SUPER_ADMIN', description: 'Full access to all systems' },
                { name: 'PRODUCT_MANAGER', description: 'Can manage catalog and approvals' },
                { name: 'SUPPORT_AGENT', description: 'Can read orders and manage tickets' },
            ];
            await this.prisma.role.createMany({ data: roles });
        }
        const settingsCount = await this.prisma.orderSettings.count();
        if (settingsCount === 0) {
            await this.prisma.orderSettings.create({
                data: {
                    returnWindowDays: 7,
                    autoCancelHours: 24,
                    codEnabled: true,
                    maxCodAmount: 10000,
                    maintenanceMode: false,
                    debugMode: false,
                    walletExpiryDays: 365,
                    minOrderForCod: 500,
                    membershipMemberThreshold: 1500,
                    membershipGoldThreshold: 4000,
                    membershipPlatinumThreshold: 8000,
                    signUpBonusAmount: 200,
                    maxRewardPointRedemptionPercent: 10,
                    rewardPointEarningRate: 1
                }
            });
        }
    }
    async getOverview(platform) {
        const platformWhere = platform ? { platform } : {};
        const productWhere = platform ? { category: { platform } } : {};
        const totalProducts = await this.prisma.product.count({ where: { isDeleted: false, ...productWhere } });
        const totalOrders = await this.prisma.order.count({ where: { isDeleted: false, ...platformWhere } });
        const activeUsers = await this.prisma.user.count();
        const payments = await this.prisma.paymentTransaction.aggregate({
            _sum: { amount: true },
            where: { status: 'SUCCESS', ...platformWhere }
        });
        const totalRevenue = payments._sum.amount || 0;
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        const currentOrders = await this.prisma.order.count({ where: { isDeleted: false, createdAt: { gte: thirtyDaysAgo }, ...platformWhere } });
        const prevOrders = await this.prisma.order.count({ where: { isDeleted: false, createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, ...platformWhere } });
        const ordersTrend = this.calculateTrend(currentOrders, prevOrders);
        const currentUsers = await this.prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } });
        const prevUsers = await this.prisma.user.count({ where: { createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } });
        const usersTrend = this.calculateTrend(currentUsers, prevUsers);
        const currentPayments = await this.prisma.paymentTransaction.aggregate({
            _sum: { amount: true },
            where: { status: 'SUCCESS', createdAt: { gte: thirtyDaysAgo }, ...platformWhere }
        });
        const prevPayments = await this.prisma.paymentTransaction.aggregate({
            _sum: { amount: true },
            where: { status: 'SUCCESS', createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo }, ...platformWhere }
        });
        const revenueTrend = this.calculateTrend(currentPayments._sum.amount || 0, prevPayments._sum.amount || 0);
        const systemHealth = (activeUsers > 0) ? '100%' : '95%';
        return {
            totalRevenue,
            activeUsers,
            totalOrders,
            totalProducts,
            systemHealth,
            revenueTrend,
            usersTrend,
            ordersTrend,
        };
    }
    calculateTrend(current, previous) {
        if (previous === 0)
            return current > 0 ? '+100%' : '0%';
        const percent = ((current - previous) / previous) * 100;
        const sign = percent > 0 ? '+' : '';
        return `${sign}${percent.toFixed(1)}%`;
    }
    async getRoles() {
        const roles = await this.prisma.role.findMany({
            include: {
                createdBy: {
                    select: { firstName: true, lastName: true, email: true }
                },
                updatedBy: {
                    select: { firstName: true, lastName: true, email: true }
                },
                _count: {
                    select: { users: true }
                },
                users: {
                    include: {
                        user: {
                            include: {
                                devices: {
                                    orderBy: { lastActiveAt: 'desc' },
                                    take: 1
                                },
                                sessions: {
                                    where: { isRevoked: false, expiresAt: { gt: new Date() } }
                                }
                            }
                        }
                    }
                }
            }
        });
        const fifteenMinsAgo = new Date(Date.now() - 15 * 60 * 1000);
        return roles.map(role => {
            let isOnline = false;
            let lastActiveAt = null;
            let lastLoginAt = null;
            for (const userRole of role.users) {
                const user = userRole.user;
                if (user.devices && user.devices.length > 0) {
                    const userLastActive = user.devices[0].lastActiveAt;
                    if (!lastActiveAt || userLastActive > lastActiveAt) {
                        lastActiveAt = userLastActive;
                    }
                    if (userLastActive > fifteenMinsAgo) {
                        isOnline = true;
                    }
                }
                if (user.sessions && user.sessions.length > 0) {
                    const sortedSessions = [...user.sessions].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                    const userLastLogin = sortedSessions[0].createdAt;
                    if (!lastLoginAt || userLastLogin > lastLoginAt) {
                        lastLoginAt = userLastLogin;
                    }
                    isOnline = true;
                }
            }
            const { users, createdBy, updatedBy, ...roleData } = role;
            return {
                ...roleData,
                isOnline,
                lastActiveAt,
                lastLoginAt,
                createdByName: createdBy ? `${createdBy.firstName || ''} ${createdBy.lastName || ''}`.trim() || createdBy.email : null,
                updatedByName: updatedBy ? `${updatedBy.firstName || ''} ${updatedBy.lastName || ''}`.trim() || updatedBy.email : null,
            };
        });
    }
    async createRole(data, userId) {
        return this.prisma.role.create({
            data: {
                name: data.name,
                description: data.description,
                panelAccess: data.panelAccess,
                ...(userId ? { createdById: userId, updatedById: userId } : {})
            }
        });
    }
    async updateRole(id, data, userId) {
        try {
            console.log('UpdateRole called with id:', id, 'data:', data);
            return await this.prisma.role.update({
                where: { id },
                data: {
                    ...data,
                    ...(userId ? { updatedById: userId } : {})
                }
            });
        }
        catch (e) {
            console.error('UpdateRole ERROR:', e);
            require('fs').writeFileSync('error_dump.txt', e.message + '\n' + e.stack);
            throw e;
        }
    }
    async updateRolePanelAccess(roleId, panelAccess, userId) {
        return this.prisma.role.update({
            where: { id: roleId },
            data: {
                panelAccess,
                ...(userId ? { updatedById: userId } : {})
            }
        });
    }
    async getUsers() {
        return this.prisma.user.findMany({
            where: {
                isDeleted: false,
                roles: {
                    some: {
                        role: {
                            name: {
                                not: 'CUSTOMER'
                            }
                        }
                    }
                }
            },
            include: {
                roles: {
                    include: {
                        role: true
                    }
                },
                customerProfile: true,
                addresses: {
                    where: { isDefault: true },
                    take: 1
                },
                orders: true,
                wishlist: {
                    include: { items: true }
                },
                cart: {
                    include: { items: true }
                },
                rewardPoints: true,
                membershipTier: true,
                sessions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
    }
    async deleteUser(id) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isDeleted: true,
                isActive: false,
                deletedAt: new Date()
            }
        });
    }
    async createStaffUser(data) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existingUser) {
            const existingRole = await this.prisma.userRole.findFirst({
                where: { userId: existingUser.id, roleId: data.roleId }
            });
            if (existingRole) {
                throw new common_1.ConflictException('A user with this email already exists and is already assigned to this role.');
            }
            await this.prisma.userRole.deleteMany({ where: { userId: existingUser.id } });
            return this.prisma.user.update({
                where: { id: existingUser.id },
                data: {
                    roles: {
                        create: { roleId: data.roleId }
                    }
                }
            });
        }
        const passwordHash = await require('bcrypt').hash('password123', 10);
        return this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone || null,
                passwordHash,
                roles: {
                    create: {
                        roleId: data.roleId
                    }
                }
            }
        });
    }
    async getStaff2FAStatus() {
        const staff = await this.prisma.user.findMany({
            where: {
                isDeleted: false,
                roles: {
                    some: {
                        role: {
                            name: {
                                not: 'CUSTOMER'
                            }
                        }
                    }
                }
            },
            include: {
                staff2fa: true,
                sessions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            }
        });
        return staff.map(u => ({
            id: u.id,
            name: `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'No Name',
            email: u.email,
            is2FAEnabled: u.staff2fa ? u.staff2fa.isVerified : false,
            lastLogin: u.sessions[0]?.createdAt
                ? new Date(u.sessions[0].createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                : 'Never'
        }));
    }
    async resetStaff2FA(userId) {
        await this.prisma.staff2fa.deleteMany({
            where: { userId }
        });
        return { success: true, message: '2FA has been reset for this user.' };
    }
    async updateUserRole(userId, data) {
        await this.prisma.userRole.deleteMany({
            where: { userId }
        });
        return this.prisma.userRole.create({
            data: {
                userId,
                roleId: data.roleId
            }
        });
    }
    async assignRole(userIdentifier, roleName) {
        const role = await this.prisma.role.findUnique({ where: { name: roleName } });
        if (!role)
            throw new Error('Role not found');
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { id: userIdentifier },
                    { email: userIdentifier }
                ]
            }
        });
        if (!user)
            throw new Error('User not found');
        return this.prisma.userRole.create({
            data: {
                userId: user.id,
                roleId: role.id
            }
        });
    }
    async getSettings() {
        return this.prisma.orderSettings.findFirst();
    }
    async updateSettings(data) {
        const settings = await this.prisma.orderSettings.findFirst();
        if (!settings)
            throw new Error('Settings not found');
        return this.prisma.orderSettings.update({
            where: { id: settings.id },
            data
        });
    }
    async getNotifications() {
        const notifications = [];
        const unassignedTickets = await this.prisma.supportTicket.count({
            where: { status: 'OPEN', assignedToId: null }
        });
        if (unassignedTickets > 0) {
            notifications.push({
                id: 'notif-tickets',
                type: 'SYSTEM',
                title: 'Unassigned Tickets',
                message: `There are ${unassignedTickets} open support tickets waiting to be assigned to an agent.`,
                time: 'Just now',
                read: false,
                iconType: 'AlertCircle',
                color: 'text-rose-500',
                bg: 'bg-rose-50'
            });
        }
        const lowStockThreshold = 100;
        const lowStockItems = await this.prisma.inventoryStock.count({
            where: { quantity: { gt: 0, lte: lowStockThreshold } }
        });
        if (lowStockItems > 0) {
            notifications.push({
                id: 'notif-stock',
                type: 'SYSTEM',
                title: 'Low Stock Alert',
                message: `${lowStockItems} products have fallen below the minimum stock threshold of ${lowStockThreshold}.`,
                time: 'Today',
                read: false,
                iconType: 'PackageCheck',
                color: 'text-amber-500',
                bg: 'bg-amber-50'
            });
        }
        const pendingOrders = await this.prisma.order.count({
            where: { status: 'PLACED' }
        });
        if (pendingOrders > 0) {
            notifications.push({
                id: 'notif-orders',
                type: 'SYSTEM',
                title: 'New Orders to Pack',
                message: `You have ${pendingOrders} new orders waiting to be processed and packed.`,
                time: 'Today',
                read: false,
                iconType: 'Bell',
                color: 'text-emerald-500',
                bg: 'bg-emerald-50'
            });
        }
        if (notifications.length === 0) {
            notifications.push({
                id: 'notif-health',
                type: 'SYSTEM',
                title: 'System Healthy',
                message: 'All operations are running smoothly. No pending alerts.',
                time: 'Today',
                read: true,
                iconType: 'CheckCircle2',
                color: 'text-blue-500',
                bg: 'bg-blue-50'
            });
        }
        return notifications;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map