import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(brandId?: string, categoryId?: string, search?: string) {
    const where: any = { isDeleted: false };
    
    if (brandId) where.brandId = brandId;
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        brand: true,
        category: true,
        variants: true,
        ingredients: true,
        concerns: true,
        skinTypes: true,
        benefits: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id, isDeleted: false },
      include: {
        brand: true,
        category: true,
        subcategory: true,
        variants: true,
        ingredients: true,
        concerns: true,
        skinTypes: true,
        benefits: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // Check if slug or SKU already exists
    const existingSlug = await this.prisma.product.findUnique({
      where: { slug: data.slug },
    });
    if (existingSlug) {
      throw new ConflictException('Product slug already exists');
    }

    const existingSku = await this.prisma.productVariant.findUnique({
      where: { sku: data.sku },
    });
    if (existingSku) {
      throw new ConflictException('Product SKU already exists');
    }

    // Transactionally create Product and its initial Variant
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: data.name,
          slug: data.slug,
          brandId: data.brandId,
          categoryId: data.categoryId,
          subcategoryId: data.subcategoryId,
          description: data.description,
          mrp: data.mrp,
          discountPrice: data.discountPrice,
        },
      });

      await tx.productVariant.create({
        data: {
          productId: product.id,
          sku: data.sku,
          name: 'Default',
          mrp: data.mrp,
          price: data.discountPrice || data.mrp,
        },
      });

      return this.findOne(product.id);
    });
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id); // Ensure exists

    const updated = await this.prisma.product.update({
      where: { id },
      data,
    });
    
    // Also update the default variant price if mrp/discountPrice changed
    if (data.mrp !== undefined || data.discountPrice !== undefined) {
       const firstVariant = await this.prisma.productVariant.findFirst({
         where: { productId: id }
       });
       if (firstVariant) {
         await this.prisma.productVariant.update({
           where: { id: firstVariant.id },
           data: {
             mrp: data.mrp !== undefined ? data.mrp : undefined,
             price: data.discountPrice !== undefined ? data.discountPrice : (data.mrp !== undefined ? data.mrp : undefined),
           }
         });
       }
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data: { isDeleted: true, deletedAt: new Date() },
    });
  }

  // --- Variant Logic --- //

  async createVariant(productId: string, data: import('./dto/product.dto').CreateVariantDto) {
    // Ensure product exists
    await this.findOne(productId);

    // Check SKU
    const existingSku = await this.prisma.productVariant.findUnique({
      where: { sku: data.sku },
    });
    if (existingSku) {
      throw new ConflictException('Product SKU already exists');
    }

    return this.prisma.productVariant.create({
      data: {
        productId,
        ...data,
      },
    });
  }

  async updateVariant(variantId: string, data: import('./dto/product.dto').UpdateVariantDto) {
    const existing = await this.prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!existing) throw new NotFoundException('Variant not found');

    if (data.sku && data.sku !== existing.sku) {
      const existingSku = await this.prisma.productVariant.findUnique({ where: { sku: data.sku } });
      if (existingSku) throw new ConflictException('Product SKU already exists');
    }

    return this.prisma.productVariant.update({
      where: { id: variantId },
      data,
    });
  }

  async removeVariant(variantId: string) {
    const existing = await this.prisma.productVariant.findUnique({ where: { id: variantId } });
    if (!existing) throw new NotFoundException('Variant not found');
    
    return this.prisma.productVariant.delete({
      where: { id: variantId },
    });
  }

  // --- Tagging Logic --- //

  async updateTags(productId: string, data: import('./dto/product.dto').UpdateTagsDto) {
    await this.findOne(productId); // Ensure product exists

    await this.prisma.$transaction(async (tx) => {
      if (data.ingredients) {
        await tx.productIngredient.deleteMany({ where: { productId } });
        if (data.ingredients.length > 0) {
          await tx.productIngredient.createMany({
            data: data.ingredients.map((name) => ({ productId, name })),
          });
        }
      }

      if (data.concerns) {
        await tx.productConcern.deleteMany({ where: { productId } });
        if (data.concerns.length > 0) {
          await tx.productConcern.createMany({
            data: data.concerns.map((name) => ({ productId, name })),
          });
        }
      }

      if (data.skinTypes) {
        await tx.productSkinType.deleteMany({ where: { productId } });
        if (data.skinTypes.length > 0) {
          await tx.productSkinType.createMany({
            data: data.skinTypes.map((name) => ({ productId, name })),
          });
        }
      }

      if (data.benefits) {
        await tx.productBenefit.deleteMany({ where: { productId } });
        if (data.benefits.length > 0) {
          await tx.productBenefit.createMany({
            data: data.benefits.map((name) => ({ productId, name })),
          });
        }
      }
    });

    return this.findOne(productId);
  }
}
