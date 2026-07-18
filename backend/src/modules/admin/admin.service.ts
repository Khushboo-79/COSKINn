import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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

    return {
      totalRevenue,
      activeUsers,
      totalOrders,
      totalProducts,
      systemHealth: '100%',
      revenueTrend: '+12.5%', 
      usersTrend: '+8.2%',
      ordersTrend: '+15.4%',
    };
  }

  async getRoles() {
    return this.prisma.role.findMany({
      include: {
        _count: {
          select: { users: true }
        }
      }
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
