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

  async getOverview() {
    const totalOrders = await this.prisma.order.count();
    const activeUsers = await this.prisma.user.count();
    const payments = await this.prisma.paymentTransaction.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS' }
    });
    const totalRevenue = payments._sum.amount || 0;

    return {
      totalRevenue,
      activeUsers,
      totalOrders,
      systemHealth: '100%',
      revenueTrend: '+12.5%', // Mock trends for now since we don't have historical data to compare
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
}
