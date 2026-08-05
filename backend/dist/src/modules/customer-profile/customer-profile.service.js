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
exports.CustomerProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CustomerProfileService = class CustomerProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
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
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            return {
                id: null,
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                skinProfile: null,
                makeupPreference: null,
                avatar: null,
            };
        }
        return {
            ...profile,
            firstName: profile.user.firstName,
            lastName: profile.user.lastName,
            email: profile.user.email,
            phone: profile.user.phone,
        };
    }
    async upsertProfile(userId, dto) {
        const dateOfBirth = dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined;
        return this.prisma.$transaction(async (tx) => {
            if (dto.firstName || dto.lastName || dto.email) {
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        ...(dto.firstName && { firstName: dto.firstName }),
                        ...(dto.lastName && { lastName: dto.lastName }),
                        ...(dto.email && { email: dto.email }),
                    }
                });
            }
            const profile = await tx.customerProfile.upsert({
                where: { userId },
                update: {
                    ...(dateOfBirth && { dateOfBirth }),
                    ...(dto.gender && { gender: dto.gender }),
                    ...(dto.avatar !== undefined && { avatar: dto.avatar }),
                },
                create: {
                    userId,
                    ...(dateOfBirth && { dateOfBirth }),
                    ...(dto.gender && { gender: dto.gender }),
                    ...(dto.avatar !== undefined && { avatar: dto.avatar }),
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
            const updatedProfile = await tx.customerProfile.findUnique({
                where: { userId },
                include: {
                    skinProfile: true,
                    makeupPreference: true,
                    user: { select: { email: true, phone: true, firstName: true, lastName: true } }
                }
            });
            if (!updatedProfile)
                return null;
            return {
                ...updatedProfile,
                firstName: updatedProfile.user.firstName,
                lastName: updatedProfile.user.lastName,
                email: updatedProfile.user.email,
                phone: updatedProfile.user.phone,
            };
        });
    }
    async getAllCustomers(page, limit, search, platform) {
        const skip = (page - 1) * limit;
        const whereClause = search ? {
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
    async getCustomer360(userId, platform) {
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
        if (!user)
            throw new common_1.NotFoundException('Customer not found');
        return user;
    }
    async updateUserStatus(userId, isActive) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: { isActive }
        });
        return { success: true, isActive: user.isActive };
    }
    async sendResetPasswordLink(userId) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('Customer not found');
        console.log(`[STUB] Sending password reset link to ${user.email || user.phone}`);
        return { success: true, message: 'Password reset link sent' };
    }
    async getAddresses(userId) {
        return this.prisma.customerAddress.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async addAddress(userId, data) {
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
    async updateAddress(userId, id, data) {
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
    async deleteAddress(userId, id) {
        return this.prisma.customerAddress.delete({
            where: { id, userId }
        });
    }
    async deleteMyAccount(userId) {
        return this.prisma.$transaction(async (tx) => {
            await tx.user.update({
                where: { id: userId },
                data: {
                    isDeleted: true,
                    deletedAt: new Date(),
                    isActive: false
                }
            });
            await tx.loginSession.updateMany({
                where: { userId },
                data: { isRevoked: true }
            });
            return { success: true, message: 'Account deleted successfully' };
        });
    }
};
exports.CustomerProfileService = CustomerProfileService;
exports.CustomerProfileService = CustomerProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerProfileService);
//# sourceMappingURL=customer-profile.service.js.map