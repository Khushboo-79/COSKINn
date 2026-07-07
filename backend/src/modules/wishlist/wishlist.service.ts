import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { where: { isPrimary: true }, take: 1 }
              }
            }
          }
        }
      }
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
        include: { items: { include: { product: { include: { images: true } } } } }
      });
    }

    return wishlist;
  }

  async addToWishlist(userId: string, productId: string) {
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId }
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId }
      });
    }

    // Check if product exists
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    // Add to wishlist (upsert ignores if it already exists because of unique constraint)
    await this.prisma.wishlistItem.upsert({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId: productId
        }
      },
      update: {},
      create: {
        wishlistId: wishlist.id,
        productId: productId
      }
    });

    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId }
    });

    if (!wishlist) return { success: true };

    try {
      await this.prisma.wishlistItem.delete({
        where: {
          wishlistId_productId: {
            wishlistId: wishlist.id,
            productId: productId
          }
        }
      });
    } catch (e) {
      // Ignore error if item wasn't in wishlist
    }

    return this.getWishlist(userId);
  }
}
