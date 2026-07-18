import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

@Injectable()
export class CustomerProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { userId },
      include: {
        skinProfile: true,
        makeupPreference: true,
        user: {
          select: {
            email: true,
            phone: true,
            firstName: true,
            lastName: true,
          }
        }
      },
    });

    if (!profile) {
      throw new NotFoundException('Customer profile not found');
    }
    return profile;
  }

  async upsertProfile(userId: string, dto: UpdateCustomerProfileDto) {
    const dateOfBirth = dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined;
    
    return this.prisma.$transaction(async (tx) => {
      const profile = await tx.customerProfile.upsert({
        where: { userId },
        update: {
          ...(dateOfBirth && { dateOfBirth }),
          ...(dto.gender && { gender: dto.gender }),
        },
        create: {
          userId,
          ...(dateOfBirth && { dateOfBirth }),
          ...(dto.gender && { gender: dto.gender }),
        },
      });

      if (dto.skinType || dto.skinConcerns) {
        await tx.customerSkinProfile.upsert({
          where: { profileId: profile.id },
          update: {
            ...(dto.skinType && { skinType: dto.skinType }),
            ...(dto.skinConcerns && { skinConcerns: dto.skinConcerns }),
          },
          create: {
            profileId: profile.id,
            skinType: dto.skinType,
            skinConcerns: dto.skinConcerns || [],
          },
        });
      }

      if (dto.makeupStyle) {
        await tx.customerMakeupPreference.upsert({
          where: { profileId: profile.id },
          update: {
            ...(dto.makeupStyle && { makeupStyle: dto.makeupStyle }),
          },
          create: {
            profileId: profile.id,
            makeupStyle: dto.makeupStyle,
          },
        });
      }

      return await tx.customerProfile.findUnique({
        where: { userId },
        include: {
          skinProfile: true,
          makeupPreference: true,
          user: { select: { email: true, phone: true, firstName: true, lastName: true } }
        }
      });
    });
  }

  async getAllCustomers(page: number, limit: number, search?: string, platform?: 'COSMETICS' | 'SKINCARE') {
    const skip = (page - 1) * limit;
    const whereClause: Prisma.UserWhereInput = search ? {
      OR: [
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    if (platform) {
      whereClause.orders = {
        some: { platform }
      };
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where: {
          ...whereClause,
          roles: {
            some: {
              role: { name: 'CUSTOMER' }
            }
          }
        },
        include: {
          customerProfile: {
            include: { skinProfile: true }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.user.count({
        where: {
          ...whereClause,
          roles: {
            some: {
              role: { name: 'CUSTOMER' }
            }
          }
        }
      })
    ]);

    return {
      data: users,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  }

  async getCustomer360(userId: string, platform?: 'COSMETICS' | 'SKINCARE') {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        customerProfile: {
          include: {
            skinProfile: true,
            makeupPreference: true
          }
        },
        wishlist: {
          include: {
            items: {
              include: { product: true }
            }
          }
        },
        orders: {
          where: platform ? { platform } : undefined,
          orderBy: { createdAt: 'desc' },
          take: 10,
          include: {
            items: true
          }
        }
      }
    });

    if (!user) throw new NotFoundException('Customer not found');
    return user;
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isActive }
    });
    return { success: true, isActive: user.isActive };
  }

  async sendResetPasswordLink(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Customer not found');
    // In a real implementation, you would generate a token and send an email
    console.log(`[STUB] Sending password reset link to ${user.email || user.phone}`);
    return { success: true, message: 'Password reset link sent' };
  }

  // --- Address Methods ---

  async getAddresses(userId: string) {
    return this.prisma.customerAddress.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  }

  async addAddress(userId: string, data: any) {
    if (data.isDefault) {
      await this.prisma.customerAddress.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    return this.prisma.customerAddress.create({
      data: {
        userId,
        type: data.type || 'home',
        fullName: data.fullName,
        phone: data.phone,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country || 'India',
        isDefault: data.isDefault || false
      }
    });
  }

  async updateAddress(userId: string, id: string, data: any) {
    if (data.isDefault) {
      await this.prisma.customerAddress.updateMany({
        where: { userId },
        data: { isDefault: false }
      });
    }

    return this.prisma.customerAddress.update({
      where: { id, userId },
      data
    });
  }

  async deleteAddress(userId: string, id: string) {
    return this.prisma.customerAddress.delete({
      where: { id, userId }
    });
  }
}
