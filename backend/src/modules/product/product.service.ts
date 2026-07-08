import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import csv = require('csv-parser');
import { Readable } from 'stream';
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(categoryId?: string, search?: string) {
    const where: any = { isDeleted: false };
    
    if (categoryId) where.categoryId = categoryId;
    if (search) {
      where.name = { contains: search, mode: 'insensitive' };
    }

    return this.prisma.product.findMany({
      where,
      include: {
        category: true,
        variants: true,
        ingredients: true,
        concerns: true,
        skinTypes: true,
        benefits: true,
        images: { orderBy: { sortOrder: 'asc' } },
        videos: { orderBy: { sortOrder: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // --- Public Catalog Methods ---

  async findAllPublic(
    page: number, 
    limit: number, 
    filters?: { minPrice?: number, maxPrice?: number, skinType?: string, fruit?: string, concern?: string, sortBy?: string }
  ) {
    const skip = (page - 1) * limit;
    
    // Build dynamic where clause
    const where: any = { isDeleted: false, status: 'LIVE' };
    
    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      where.discountPrice = {};
      if (filters.minPrice !== undefined) where.discountPrice.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.discountPrice.lte = filters.maxPrice;
    }
    if (filters?.skinType) {
      where.skinTypes = { some: { name: { equals: filters.skinType, mode: 'insensitive' } } };
    }
    if (filters?.fruit) {
      where.ingredients = { some: { name: { equals: filters.fruit, mode: 'insensitive' } } };
    }
    if (filters?.concern) {
      where.concerns = { some: { name: { equals: filters.concern, mode: 'insensitive' } } };
    }

    // Build dynamic orderBy
    let orderBy: any = { createdAt: 'desc' };
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'price_asc': orderBy = { discountPrice: 'asc' }; break;
        case 'price_desc': orderBy = { discountPrice: 'desc' }; break;
        case 'newest': orderBy = { createdAt: 'desc' }; break;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          category: true,
          variants: true,
          images: { orderBy: { sortOrder: 'asc' }, take: 1 },
        },
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    };
  }

  async search(query: string) {
    // Uses PostgreSQL full text search natively through Prisma preview feature
    const searchQuery = query.split(' ').map(term => `${term}:*`).join(' & ');
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        status: 'LIVE',
        OR: [
          { name: { search: searchQuery } },
          { description: { search: searchQuery } },
        ],
      },
      include: {
        variants: true,
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      }
    });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({
      where: { categoryId, isDeleted: false, status: 'LIVE' },
      include: {
        variants: true,
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      }
    });
  }

  async findByConcern(concernId: string) {
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        status: 'LIVE',
        concerns: { some: { id: concernId } }
      },
      include: {
        variants: true,
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      }
    });
  }

  async findByFruit(fruitName: string) {
    return this.prisma.product.findMany({
      where: {
        isDeleted: false,
        status: 'LIVE',
        ingredients: { some: { name: { equals: fruitName, mode: 'insensitive' } } }
      },
      include: {
        variants: true,
        images: { orderBy: { sortOrder: 'asc' }, take: 1 },
      }
    });
  }

  async findOnePublic(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false, status: 'LIVE' },
      include: {
        category: true,
        variants: true,
        ingredients: true,
        concerns: true,
        skinTypes: true,
        benefits: true,
        images: { orderBy: { sortOrder: 'asc' } },
        videos: { orderBy: { sortOrder: 'asc' } },
        questions: { where: { isApproved: true }, take: 5 },
        reviews: { where: { isApproved: true }, take: 5 },
      },
    });

    if (!product) {
      throw new NotFoundException(`Published product #${id} not found`);
    }

    return product;
  }

  async getProductVariantsPublic(id: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, isDeleted: false, status: 'LIVE' },
      select: {
        id: true,
        name: true,
        variants: {
          select: {
            id: true,
            sku: true,
            name: true,
            netQuantity: true,
            mrp: true,
            price: true
          }
        }
      }
    });

    if (!product) {
      throw new NotFoundException(`Published product #${id} not found`);
    }

    return product.variants;
  }

  async findOne(id: string, tx: any = this.prisma) {
    const product = await tx.product.findFirst({
      where: { id, isDeleted: false },
      include: {
        category: true,
        subcategory: true,
        variants: true,
        ingredients: true,
        concerns: true,
        skinTypes: true,
        benefits: true,
        images: { orderBy: { sortOrder: 'asc' } },
        videos: { orderBy: { sortOrder: 'asc' } },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // Check if slug or SKU already exists
    const existingSlug = await this.prisma.product.findFirst({
      where: { slug: data.slug },
    });
    if (existingSlug) {
      throw new ConflictException('Product slug already exists');
    }

    const existingSku = await this.prisma.productVariant.findFirst({
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
          categoryId: data.categoryId,
          subcategoryId: data.subcategoryId,
          description: data.description,
          mrp: data.mrp,
          discountPrice: data.discountPrice,
          status: 'LIVE', // Defaulting to LIVE for testing flow without approval steps
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

      return this.findOne(product.id, tx);
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

  // --- Media Logic --- //

  async addImage(productId: string, url: string) {
    await this.findOne(productId); // Ensure product exists

    const lastImage = await this.prisma.productImage.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
    });
    const sortOrder = lastImage ? lastImage.sortOrder + 1 : 0;

    await this.prisma.productImage.create({
      data: {
        productId,
        url,
        sortOrder,
      },
    });

    return this.findOne(productId);
  }

  async addVideo(productId: string, data: import('./dto/product.dto').CreateProductVideoDto) {
    await this.findOne(productId); // Ensure product exists

    const lastVideo = await this.prisma.productVideo.findFirst({
      where: { productId },
      orderBy: { sortOrder: 'desc' },
    });
    const sortOrder = lastVideo ? lastVideo.sortOrder + 1 : 0;

    await this.prisma.productVideo.create({
      data: {
        productId,
        url: data.url,
        title: data.title,
        sortOrder,
      },
    });

    return this.findOne(productId);
  }

  async reorderMedia(productId: string, data: import('./dto/product.dto').UpdateMediaOrderDto) {
    await this.findOne(productId);

    await this.prisma.$transaction(async (tx) => {
      if (data.images) {
        for (const item of data.images) {
          await tx.productImage.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder },
          });
        }
      }
      if (data.videos) {
        for (const item of data.videos) {
          await tx.productVideo.update({
            where: { id: item.id },
            data: { sortOrder: item.sortOrder },
          });
        }
      }
    });

    return this.findOne(productId);
  }

  async removeImage(productId: string, imageId: string) {
    await this.prisma.productImage.delete({
      where: { id: imageId },
    });
    return this.findOne(productId);
  }

  async removeVideo(productId: string, videoId: string) {
    await this.prisma.productVideo.delete({
      where: { id: videoId },
    });
    return this.findOne(productId);
  }

  // --- Compliance & Commerce --- //

  async updateCompliance(productId: string, data: import('./dto/product.dto').UpdateComplianceDto) {
    return this.prisma.product.update({
      where: { id: productId },
      data,
    });
  }

  async initializeOpeningStock(productId: string, variantId: string, data: import('./dto/product.dto').OpeningStockDto) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId, productId },
    });
    if (!variant) throw new NotFoundException('Variant not found for this product');

    // Update variant netQuantity if provided
    if (data.netQuantity) {
      await this.prisma.productVariant.update({
        where: { id: variantId },
        data: { netQuantity: data.netQuantity },
      });
    }

    // Default Warehouse for initial setup
    let warehouse = await this.prisma.warehouse.findFirst();
    if (!warehouse) {
      warehouse = await this.prisma.warehouse.create({
        data: { name: 'Main Warehouse', address: 'HQ', code: 'MAIN-HQ' },
      });
    }

    return this.prisma.$transaction(async (tx) => {
      // Create or find batch (using variant's SKU as required by InventoryBatch schema)
      let batch = await tx.inventoryBatch.findUnique({
        where: { variantId_batchNumber: { variantId, batchNumber: data.batchNumber } } as any, // fallback to search by sku & batch
      });

      if (!batch) {
        // Find by sku & batch since that is what is defined in DB
        batch = await tx.inventoryBatch.findFirst({
           where: { sku: variant.sku, batchNumber: data.batchNumber }
        });
      }

      if (!batch) {
        batch = await tx.inventoryBatch.create({
          data: {
            sku: variant.sku,
            batchNumber: data.batchNumber,
            mfgDate: data.manufacturingDate ? new Date(data.manufacturingDate) : null,
            expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
          },
        });
      }

      // Add to stock
      const existingStock = await tx.inventoryStock.findUnique({
        where: { warehouseId_sku: { warehouseId: warehouse.id, sku: variant.sku } },
      });

      if (existingStock) {
        await tx.inventoryStock.update({
          where: { id: existingStock.id },
          data: { quantity: { increment: data.quantity } },
        });
      } else {
        await tx.inventoryStock.create({
          data: {
            warehouseId: warehouse.id,
            sku: variant.sku,
            quantity: data.quantity,
          },
        });
      }

      // Record movement
      await tx.stockMovement.create({
        data: {
          warehouseId: warehouse.id,
          sku: variant.sku,
          type: 'IN',
          quantity: data.quantity,
          reference: `OPENING_STOCK_BATCH_${data.batchNumber}`,
        },
      });

      return { success: true, batch, stockAdded: data.quantity };
    });
  }

  async updateContent(id: string, data: any) {
    const { ingredients, benefits, ...productFields } = data;

    return this.prisma.$transaction(async (tx) => {
      // Update core product fields
      const updatedProduct = await tx.product.update({
        where: { id },
        data: productFields,
      });

      // Update Ingredients if provided
      if (ingredients !== undefined) {
        await tx.productIngredient.deleteMany({ where: { productId: id } });
        if (ingredients.length > 0) {
          await tx.productIngredient.createMany({
            data: ingredients.map((name: string) => ({ productId: id, name })),
          });
        }
      }

      // Update Benefits if provided
      if (benefits !== undefined) {
        await tx.productBenefit.deleteMany({ where: { productId: id } });
        if (benefits.length > 0) {
          await tx.productBenefit.createMany({
            data: benefits.map((name: string) => ({ productId: id, name })),
          });
        }
      }

      return updatedProduct;
    });
  }

  async submitForApproval(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { variants: true }
    });

    if (!product) throw new NotFoundException('Product not found');
    
    // Server-side validation for Cosmetics Rules 2020
    const missingFields: string[] = [];
    if (!product.manufacturerName) missingFields.push('Manufacturer Name');
    if (!product.manufacturerAddress) missingFields.push('Manufacturer Address');
    if (!product.countryOfOrigin) missingFields.push('Country of Origin');
    if (!product.testReportRef) missingFields.push('Test Report Reference');
    if (!product.variants || product.variants.length === 0) missingFields.push('At least one product variant');

    if (missingFields.length > 0) {
      throw new BadRequestException(
        `Cannot submit for approval. Missing mandatory compliance fields: ${missingFields.join(', ')}`
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: { status: 'PENDING_APPROVAL', rejectionReason: null },
    });
  }

  async approveProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { status: 'LIVE', rejectionReason: null },
    });
  }

  async rejectProduct(id: string, reason: string) {
    if (!reason) throw new BadRequestException('Rejection reason is required');
    return this.prisma.product.update({
      where: { id },
      data: { status: 'REJECTED', rejectionReason: reason },
    });
  }

  async deactivateProduct(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { status: 'DRAFT' },
    });
  }

  async updateSeo(id: string, data: { seoTitle?: string, seoDesc?: string, seoKeywords?: string }) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async getMarketingFeed(filters: any) {
    const { categoryId, concern, ingredient, skinType } = filters;

    const where: any = {
      status: 'LIVE',
      isDeleted: false,
    };

    if (categoryId) where.categoryId = categoryId;
    if (concern) {
      where.concerns = { some: { name: { contains: concern, mode: 'insensitive' } } };
    }
    if (ingredient) {
      where.ingredients = { some: { name: { contains: ingredient, mode: 'insensitive' } } };
    }
    if (skinType) {
      where.skinTypes = { some: { name: { contains: skinType, mode: 'insensitive' } } };
    }

    const products = await this.prisma.product.findMany({
      where,
      include: {
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1
        },
        variants: {
          select: {
            id: true,
            sku: true,
            name: true,
            mrp: true,
            price: true,
          }
        },
        concerns: true,
        ingredients: true,
        skinTypes: true,
      },
    });

    return products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      mrp: p.mrp,
      discountPrice: p.discountPrice,
      category: p.category.name,
      primaryImage: p.images[0]?.url || null,
      variants: p.variants.map(v => ({
        ...v,
        // In a real scenario, this would query Inventory or an order-aware view
        // For marketing feed, we return mock stock logic or static for now, as requested.
        availableQuantity: 100,
        isOutOfStock: false,
      })),
      concerns: p.concerns.map(c => c.name),
      ingredients: p.ingredients.map(i => i.name),
      skinTypes: p.skinTypes.map(s => s.name),
      seoTitle: p.seoTitle,
      seoDesc: p.seoDesc,
      seoKeywords: p['seoKeywords'],
    }));
  }

  async exportCsv(): Promise<string> {
    const products = await this.prisma.product.findMany({
      where: { isDeleted: false },
      include: {
        category: true,
        variants: {
          take: 1
        }
      }
    });

    const header = [
      'slug', 'name', 'categoryId', 'status', 'description', 'manufacturerName',
      'manufacturerAddress', 'countryOfOrigin', 'testReportRef', 'mrp', 'discountPrice',
      'variantSku', 'variantName', 'variantMrp', 'variantPrice'
    ].join(',');

    const rows = products.map(p => {
      const v = p.variants[0] || {} as any;
      return [
        p.slug, p.name, p.categoryId, p.status, p.description?.replace(/,/g, '') || '',
        p.manufacturerName || '', p.manufacturerAddress?.replace(/,/g, '') || '',
        p.countryOfOrigin || '', p.testReportRef || '',
        p.mrp, p.discountPrice || '',
        v.sku || '', v.name || '', v.mrp || '', v.price || ''
      ].map(val => `"${val}"`).join(',');
    });

    return [header, ...rows].join('\n');
  }

  async importCsv(buffer: Buffer): Promise<{ total: number, success: number, failed: number, errors: string[] }> {
    return new Promise((resolve, reject) => {
      const results: any[] = [];
      const errors: string[] = [];
      let successCount = 0;

      Readable.from(buffer)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          for (const row of results) {
            try {
              if (!row.slug || !row.name || !row.categoryId || !row.variantSku) {
                errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
                continue;
              }

              // Validate cosmetics rules if status is LIVE or PENDING_APPROVAL
              let finalStatus = row.status || 'DRAFT';
              if (finalStatus === 'LIVE' || finalStatus === 'PENDING_APPROVAL') {
                if (!row.manufacturerName || !row.manufacturerAddress || !row.countryOfOrigin) {
                  errors.push(`Row for ${row.slug} failed Cosmetics Rules 2020 validation. Forced to DRAFT.`);
                  finalStatus = 'DRAFT';
                }
              }

              // Upsert product
              const product = await this.prisma.product.upsert({
                where: { slug: row.slug },
                update: {
                  name: row.name,
                  categoryId: row.categoryId,
                  status: finalStatus as any,
                  description: row.description,
                  manufacturerName: row.manufacturerName,
                  manufacturerAddress: row.manufacturerAddress,
                  countryOfOrigin: row.countryOfOrigin,
                  testReportRef: row.testReportRef,
                  mrp: parseFloat(row.mrp) || 0,
                  discountPrice: parseFloat(row.discountPrice) || null,
                },
                create: {
                  slug: row.slug,
                  name: row.name,
                  categoryId: row.categoryId,
                  status: finalStatus as any,
                  description: row.description,
                  manufacturerName: row.manufacturerName,
                  manufacturerAddress: row.manufacturerAddress,
                  countryOfOrigin: row.countryOfOrigin,
                  testReportRef: row.testReportRef,
                  mrp: parseFloat(row.mrp) || 0,
                  discountPrice: parseFloat(row.discountPrice) || null,
                }
              });

              // Upsert primary variant
              await this.prisma.productVariant.upsert({
                where: { sku: row.variantSku },
                update: {
                  name: row.variantName || 'Default',
                  mrp: parseFloat(row.variantMrp) || parseFloat(row.mrp) || 0,
                  price: parseFloat(row.variantPrice) || parseFloat(row.discountPrice || row.mrp) || 0,
                  productId: product.id,
                },
                create: {
                  sku: row.variantSku,
                  name: row.variantName || 'Default',
                  mrp: parseFloat(row.variantMrp) || parseFloat(row.mrp) || 0,
                  price: parseFloat(row.variantPrice) || parseFloat(row.discountPrice || row.mrp) || 0,
                  productId: product.id,
                }
              });

              successCount++;
            } catch (err: any) {
              errors.push(`Failed to process row ${row.slug}: ${err.message}`);
            }
          }
          
          resolve({
            total: results.length,
            success: successCount,
            failed: results.length - successCount,
            errors
          });
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
