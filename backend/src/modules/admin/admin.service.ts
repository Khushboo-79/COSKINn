import { Injectable, OnModuleInit, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Seed default roles if they don't exist
    const roleCount = await this.prisma.role.count();
    if (roleCount === 0) {
      const roles = [
        { name: 'SUPER_ADMIN', description: 'Full access to all systems' },
        { name: 'PRODUCT_MANAGER', description: 'Can manage catalog and approvals' },
        { name: 'SUPPORT_AGENT', description: 'Can read orders and manage tickets' },
      ];
      await this.prisma.role.createMany({ data: roles });
    }

    // Seed default order settings if none exist
    const settingsCount = await this.prisma.orderSettings.count();
    if (settingsCount === 0) {
      await this.prisma.orderSettings.create({
        data: {
          returnWindowDays: 7,
          autoCancelHours: 24,
          codEnabled: true,
          maxCodAmount: 5000,
        }
      });
    }
  }

  async getOverview(platform?: 'COSMETICS' | 'SKINCARE') {
    // We will query products to get an accurate count for the platform.
    const platformWhere = platform ? { platform } : {};
    const productWhere = platform ? { category: { platform } } : {};
    
    const totalProducts = await this.prisma.product.count({ where: { isDeleted: false, ...productWhere } });
    const totalOrders = await this.prisma.order.count({ where: { isDeleted: false, ...platformWhere } });
    
    // Active users don't have a platform, they span across the whole system
    const activeUsers = await this.prisma.user.count();
    
    const payments = await this.prisma.paymentTransaction.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS', ...platformWhere }
    });
    
    const totalRevenue = payments._sum.amount || 0;

    // --- Calculate Trends ---
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

    // Dynamic system health: Assuming healthy if some users/orders exist
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

  private calculateTrend(current: number, previous: number): string {
    if (previous === 0) return current > 0 ? '+100%' : '0%';
    const percent = ((current - previous) / previous) * 100;
    const sign = percent > 0 ? '+' : '';
    return `${sign}${percent.toFixed(1)}%`;
  }

  async getRoles() {
    const roles = await this.prisma.role.findMany({
      include: {
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

      for (const userRole of role.users) {
        const user = userRole.user;
        const hasRecentDevice = user.devices.some(d => d.lastActiveAt > fifteenMinsAgo);
        const hasActiveSession = user.sessions.length > 0;
        
        if (hasRecentDevice || hasActiveSession) {
          isOnline = true;
          break;
        }
      }

      const { users, ...roleData } = role;
      return {
        ...roleData,
        isActive: isOnline
      };
    });
  }

  async createRole(data: { name: string, description?: string, panelAccess: string[] }) {
    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        panelAccess: data.panelAccess
      }
    });
  }

  async updateRole(id: string, data: { name?: string, description?: string, panelAccess?: string[], isActive?: boolean }) {
    return this.prisma.role.update({
      where: { id },
      data
    });
  }

  async updateRolePanelAccess(roleId: string, panelAccess: string[]) {
    return this.prisma.role.update({
      where: { id: roleId },
      data: { panelAccess }
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      where: {
        roles: {
          some: {} // Any user with a role is considered an internal user/admin
        }
      },
      include: {
        roles: {
          include: {
            role: true
          }
        }
      }
    });
  }

  async createStaffUser(data: { firstName: string, lastName: string, email: string, phone: string, roleId: string }) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: data.email } });
    
    if (existingUser) {
      // Check if they already have a role assigned
      const existingRole = await this.prisma.userRole.findFirst({
        where: { userId: existingUser.id, roleId: data.roleId }
      });

      if (existingRole) {
        throw new ConflictException('A user with this email already exists and is already assigned to this role.');
      }

      // Clear any existing roles and assign the new one, since UI expects one role
      await this.prisma.userRole.deleteMany({ where: { userId: existingUser.id } });
      
      // Update existing user with the new role
      return this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          roles: {
            create: { roleId: data.roleId }
          }
        }
      });
    }

    const passwordHash = await bcrypt.hash('password123', 10);
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

  async updateUserRole(userId: string, roleId: string) {
    // Delete existing roles for this user
    await this.prisma.userRole.deleteMany({
      where: { userId }
    });
    
    // Assign new role
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId
      }
    });
  }

  async assignRole(userIdentifier: string, roleName: string) {
    const role = await this.prisma.role.findUnique({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: userIdentifier },
          { email: userIdentifier }
        ]
      }
    });

    if (!user) throw new Error('User not found');

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

  async updateSettings(data: any) {
    const settings = await this.prisma.orderSettings.findFirst();
    if (!settings) throw new Error('Settings not found');
    
    return this.prisma.orderSettings.update({
      where: { id: settings.id },
      data
    });
  }

  async getNotifications() {
    const notifications: any[] = [];

    // 1. Unassigned Support Tickets
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

    // 2. Low Stock Alerts
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

    // 3. Pending Orders
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

    // Default system health notification if all is well
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
}
