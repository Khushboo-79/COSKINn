import { Injectable, NotFoundException } from '@nestjs/common';
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

      if (dto.preferredBrands || dto.makeupStyle) {
        await tx.customerMakeupPreference.upsert({
          where: { profileId: profile.id },
          update: {
            ...(dto.preferredBrands && { preferredBrands: dto.preferredBrands }),
            ...(dto.makeupStyle && { makeupStyle: dto.makeupStyle }),
          },
          create: {
            profileId: profile.id,
            preferredBrands: dto.preferredBrands || [],
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
}

