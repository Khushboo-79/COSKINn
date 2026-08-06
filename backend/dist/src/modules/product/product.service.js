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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const csv = require("csv-parser");
const stream_1 = require("stream");
let ProductService = class ProductService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(categoryId, search, platform, status) {
        const where = { isDeleted: false };
        if (categoryId)
            where.categoryId = categoryId;
        if (search) {
            where.name = { contains: search, mode: 'insensitive' };
        }
        if (platform) {
            where.category = { platform };
        }
        if (status) {
            where.status = status;
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
    async getStats() {
        const totalProducts = await this.prisma.product.count({
            where: { isDeleted: false },
        });
        const activeVariants = await this.prisma.productVariant.count({
            where: { product: { isDeleted: false } },
        });
        const totalCategories = await this.prisma.category.count({
            where: { isDeleted: false },
        });
        const lowStockSkus = await this.prisma.inventoryStock.count({
            where: { quantity: { lte: 10, gt: 0 } },
        });
        const outOfStockCount = await this.prisma.inventoryStock.count({
            where: { quantity: { equals: 0 } },
        });
        const draftCount = await this.prisma.product.count({
            where: { isDeleted: true },
        });
        const missingSeoCount = await this.prisma.product.count({
            where: {
                isDeleted: false,
                OR: [{ seoDesc: null }, { seoDesc: '' }],
            },
        });
        return {
            totalProducts,
            activeVariants,
            lowStockSkus,
            outOfStockCount,
            draftCount,
            totalCategories,
            missingSeoCount,
        };
    }
    async findAllPublic(page, limit, filters) {
        const skip = (page - 1) * limit;
        const where = { isDeleted: false, status: 'LIVE' };
        if (filters?.segment && filters.segment !== 'BOTH') {
            where.OR = [
                { productLine: filters.segment },
                { productLine: 'BOTH' },
                { isCrossSegment: true },
            ];
        }
        if (filters?.platform) {
            where.category = { platform: filters.platform };
        }
        if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
            where.discountPrice = {};
            if (filters.minPrice !== undefined)
                where.discountPrice.gte = filters.minPrice;
            if (filters.maxPrice !== undefined)
                where.discountPrice.lte = filters.maxPrice;
        }
        if (filters?.skinType) {
            where.skinTypes = {
                some: { name: { equals: filters.skinType, mode: 'insensitive' } },
            };
        }
        if (filters?.fruit) {
            where.ingredients = {
                some: { name: { equals: filters.fruit, mode: 'insensitive' } },
            };
        }
        if (filters?.concern) {
            where.concerns = {
                some: { name: { equals: filters.concern, mode: 'insensitive' } },
            };
        }
        let orderBy = { createdAt: 'desc' };
        if (filters?.sortBy) {
            switch (filters.sortBy) {
                case 'price_asc':
                    orderBy = { discountPrice: 'asc' };
                    break;
                case 'price_desc':
                    orderBy = { discountPrice: 'desc' };
                    break;
                case 'newest':
                    orderBy = { createdAt: 'desc' };
                    break;
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
            meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }
    async search(query, segment) {
        if (!query || query.trim() === '') {
            return [];
        }
        const where = {
            isDeleted: false,
            status: 'LIVE',
            OR: [
                { name: { contains: query.trim(), mode: 'insensitive' } },
                { description: { contains: query.trim(), mode: 'insensitive' } },
            ],
        };
        if (segment && segment !== 'BOTH') {
            where.AND = [
                {
                    OR: [
                        { productLine: segment },
                        { productLine: 'BOTH' },
                        { isCrossSegment: true },
                    ],
                },
            ];
        }
        return this.prisma.product.findMany({
            where,
            include: {
                variants: true,
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            },
        });
    }
    async findByCategory(categoryId, segment) {
        const where = { categoryId, isDeleted: false, status: 'LIVE' };
        if (segment && segment !== 'BOTH') {
            where.OR = [
                { productLine: segment },
                { productLine: 'BOTH' },
                { isCrossSegment: true },
            ];
        }
        return this.prisma.product.findMany({
            where,
            include: {
                variants: true,
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            },
        });
    }
    async findByConcern(concernId, segment) {
        const where = {
            isDeleted: false,
            status: 'LIVE',
            concerns: { some: { id: concernId } },
        };
        if (segment && segment !== 'BOTH') {
            where.OR = [
                { productLine: segment },
                { productLine: 'BOTH' },
                { isCrossSegment: true },
            ];
        }
        return this.prisma.product.findMany({
            where,
            include: {
                variants: true,
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            },
        });
    }
    async findByFruit(fruitName, segment) {
        const where = {
            isDeleted: false,
            status: 'LIVE',
            ingredients: {
                some: { name: { equals: fruitName, mode: 'insensitive' } },
            },
        };
        if (segment && segment !== 'BOTH') {
            where.OR = [
                { productLine: segment },
                { productLine: 'BOTH' },
                { isCrossSegment: true },
            ];
        }
        return this.prisma.product.findMany({
            where,
            include: {
                variants: true,
                images: { orderBy: { sortOrder: 'asc' }, take: 1 },
            },
        });
    }
    async findOnePublic(identifier) {
        const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
        const product = await this.prisma.product.findFirst({
            where: {
                isDeleted: false,
                status: 'LIVE',
                OR: isUuid ? [{ id: identifier }] : [{ slug: identifier }]
            },
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
            throw new common_1.NotFoundException(`Published product #${identifier} not found`);
        }
        return product;
    }
    async getProductVariantsPublic(id) {
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
                        price: true,
                    },
                },
            },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Published product #${id} not found`);
        }
        return product.variants;
    }
    async findOne(id, tx = this.prisma) {
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
            throw new common_1.NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }
    async create(data) {
        const existingSlug = await this.prisma.product.findFirst({
            where: { slug: data.slug },
        });
        if (existingSlug) {
            throw new common_1.ConflictException('Product slug already exists');
        }
        const existingSku = await this.prisma.productVariant.findFirst({
            where: { sku: data.sku },
        });
        if (existingSku) {
            throw new common_1.ConflictException('Product SKU already exists');
        }
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
                    status: 'DRAFT',
                },
            });
            await tx.productVariant.create({
                data: {
                    productId: product.id,
                    sku: data.sku,
                    name: 'Default',
                    mrp: data.mrp,
                    price: data.discountPrice || data.mrp,
                    stockQuantity: data.stockQuantity || 0,
                    mfgDate: data.mfgDate ? new Date(data.mfgDate) : null,
                    expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                    shadeName: data.shadeName || null,
                    shadeHex: data.shadeHex || null,
                },
            });
            return this.findOne(product.id, tx);
        });
    }
    async update(id, data) {
        try {
            await this.findOne(id);
            const { stockQuantity, mfgDate, expiryDate, shadeName, shadeHex, ...productData } = data;
            const updated = await this.prisma.product.update({
                where: { id },
                data: { ...productData, status: data.status },
            });
            if (data.mrp !== undefined ||
                data.discountPrice !== undefined ||
                stockQuantity !== undefined ||
                mfgDate !== undefined ||
                expiryDate !== undefined ||
                shadeName !== undefined ||
                shadeHex !== undefined) {
                const firstVariant = await this.prisma.productVariant.findFirst({
                    where: { productId: id },
                });
                if (firstVariant) {
                    await this.prisma.productVariant.update({
                        where: { id: firstVariant.id },
                        data: {
                            mrp: data.mrp !== undefined ? data.mrp : undefined,
                            price: data.discountPrice !== undefined
                                ? data.discountPrice
                                : data.mrp !== undefined
                                    ? data.mrp
                                    : undefined,
                            stockQuantity: stockQuantity !== undefined ? stockQuantity : undefined,
                            mfgDate: mfgDate ? new Date(mfgDate) : mfgDate === null ? null : undefined,
                            expiryDate: expiryDate ? new Date(expiryDate) : expiryDate === null ? null : undefined,
                            shadeName: shadeName !== undefined ? shadeName : undefined,
                            shadeHex: shadeHex !== undefined ? shadeHex : undefined,
                        },
                    });
                }
            }
            return this.findOne(id);
        }
        catch (e) {
            require('fs').writeFileSync('C:\\Users\\Reshma Kushwaha\\OneDrive\\Desktop\\COSKINn\\backend\\error-log.txt', String(e) + '\n\n' + e.stack + '\n\nData: ' + JSON.stringify(data));
            throw e;
        }
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: { isDeleted: true, deletedAt: new Date() },
        });
    }
    async createVariant(productId, data) {
        await this.findOne(productId);
        const existingSku = await this.prisma.productVariant.findUnique({
            where: { sku: data.sku },
        });
        if (existingSku) {
            throw new common_1.ConflictException('Product SKU already exists');
        }
        return this.prisma.productVariant.create({
            data: {
                productId,
                ...data,
            },
        });
    }
    async updateVariant(variantId, data) {
        const existing = await this.prisma.productVariant.findUnique({
            where: { id: variantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Variant not found');
        if (data.sku && data.sku !== existing.sku) {
            const existingSku = await this.prisma.productVariant.findUnique({
                where: { sku: data.sku },
            });
            if (existingSku)
                throw new common_1.ConflictException('Product SKU already exists');
        }
        return this.prisma.productVariant.update({
            where: { id: variantId },
            data,
        });
    }
    async removeVariant(variantId) {
        const existing = await this.prisma.productVariant.findUnique({
            where: { id: variantId },
        });
        if (!existing)
            throw new common_1.NotFoundException('Variant not found');
        return this.prisma.productVariant.delete({
            where: { id: variantId },
        });
    }
    async updateTags(productId, data) {
        await this.findOne(productId);
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
    async addImage(productId, url) {
        await this.findOne(productId);
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
    async addVideo(productId, data) {
        await this.findOne(productId);
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
    async reorderMedia(productId, data) {
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
    async removeImage(productId, imageId) {
        await this.prisma.productImage.delete({
            where: { id: imageId },
        });
        return this.findOne(productId);
    }
    async removeVideo(productId, videoId) {
        await this.prisma.productVideo.delete({
            where: { id: videoId },
        });
        return this.findOne(productId);
    }
    async updateCompliance(productId, data) {
        return this.prisma.product.update({
            where: { id: productId },
            data,
        });
    }
    async initializeOpeningStock(productId, variantId, data) {
        const variant = await this.prisma.productVariant.findUnique({
            where: { id: variantId, productId },
        });
        if (!variant)
            throw new common_1.NotFoundException('Variant not found for this product');
        if (data.netQuantity) {
            await this.prisma.productVariant.update({
                where: { id: variantId },
                data: { netQuantity: data.netQuantity },
            });
        }
        let warehouse = await this.prisma.warehouse.findFirst();
        if (!warehouse) {
            warehouse = await this.prisma.warehouse.create({
                data: { name: 'Main Warehouse', address: 'HQ', code: 'MAIN-HQ' },
            });
        }
        return this.prisma.$transaction(async (tx) => {
            let batch = await tx.inventoryBatch.findUnique({
                where: {
                    variantId_batchNumber: { variantId, batchNumber: data.batchNumber },
                },
            });
            if (!batch) {
                batch = await tx.inventoryBatch.findFirst({
                    where: { sku: variant.sku, batchNumber: data.batchNumber },
                });
            }
            if (!batch) {
                batch = await tx.inventoryBatch.create({
                    data: {
                        sku: variant.sku,
                        batchNumber: data.batchNumber,
                        mfgDate: data.manufacturingDate
                            ? new Date(data.manufacturingDate)
                            : null,
                        expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
                    },
                });
            }
            const existingStock = await tx.inventoryStock.findUnique({
                where: {
                    warehouseId_sku: { warehouseId: warehouse.id, sku: variant.sku },
                },
            });
            if (existingStock) {
                await tx.inventoryStock.update({
                    where: { id: existingStock.id },
                    data: { quantity: { increment: data.quantity } },
                });
            }
            else {
                await tx.inventoryStock.create({
                    data: {
                        warehouseId: warehouse.id,
                        sku: variant.sku,
                        quantity: data.quantity,
                    },
                });
            }
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
    async updateContent(id, data) {
        const { ingredients, benefits, ...productFields } = data;
        return this.prisma.$transaction(async (tx) => {
            const updatedProduct = await tx.product.update({
                where: { id },
                data: productFields,
            });
            if (ingredients !== undefined) {
                await tx.productIngredient.deleteMany({ where: { productId: id } });
                if (ingredients.length > 0) {
                    await tx.productIngredient.createMany({
                        data: ingredients.map((name) => ({ productId: id, name })),
                    });
                }
            }
            if (benefits !== undefined) {
                await tx.productBenefit.deleteMany({ where: { productId: id } });
                if (benefits.length > 0) {
                    await tx.productBenefit.createMany({
                        data: benefits.map((name) => ({ productId: id, name })),
                    });
                }
            }
            return updatedProduct;
        });
    }
    async submitForApproval(id) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { variants: true },
        });
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const missingFields = [];
        if (!product.manufacturerName)
            missingFields.push('Manufacturer Name');
        if (!product.manufacturerAddress)
            missingFields.push('Manufacturer Address');
        if (!product.countryOfOrigin)
            missingFields.push('Country of Origin');
        if (!product.testReportRef)
            missingFields.push('Test Report Reference');
        if (!product.variants || product.variants.length === 0)
            missingFields.push('At least one product variant');
        if (missingFields.length > 0) {
            throw new common_1.BadRequestException(`Cannot submit for approval. Missing mandatory compliance fields: ${missingFields.join(', ')}`);
        }
        return this.prisma.product.update({
            where: { id },
            data: { status: 'PENDING_APPROVAL', rejectionReason: null },
        });
    }
    async approveProduct(id) {
        return this.prisma.product.update({
            where: { id },
            data: { status: 'LIVE', rejectionReason: null },
        });
    }
    async rejectProduct(id, reason) {
        if (!reason)
            throw new common_1.BadRequestException('Rejection reason is required');
        return this.prisma.product.update({
            where: { id },
            data: { status: 'REJECTED', rejectionReason: reason },
        });
    }
    async deactivateProduct(id) {
        return this.prisma.product.update({
            where: { id },
            data: { status: 'DRAFT' },
        });
    }
    async updateSeo(id, data) {
        return this.prisma.product.update({
            where: { id },
            data,
        });
    }
    async getMarketingFeed(filters) {
        const { categoryId, concern, ingredient, skinType } = filters;
        const where = {
            status: 'LIVE',
            isDeleted: false,
        };
        if (categoryId)
            where.categoryId = categoryId;
        if (concern) {
            where.concerns = {
                some: { name: { contains: concern, mode: 'insensitive' } },
            };
        }
        if (ingredient) {
            where.ingredients = {
                some: { name: { contains: ingredient, mode: 'insensitive' } },
            };
        }
        if (skinType) {
            where.skinTypes = {
                some: { name: { contains: skinType, mode: 'insensitive' } },
            };
        }
        const products = await this.prisma.product.findMany({
            where,
            include: {
                category: true,
                images: {
                    where: { isPrimary: true },
                    take: 1,
                },
                variants: {
                    select: {
                        id: true,
                        sku: true,
                        name: true,
                        mrp: true,
                        price: true,
                    },
                },
                concerns: true,
                ingredients: true,
                skinTypes: true,
            },
        });
        return products.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            description: p.description,
            mrp: p.mrp,
            discountPrice: p.discountPrice,
            category: p.category.name,
            primaryImage: p.images[0]?.url || null,
            variants: p.variants.map((v) => ({
                ...v,
                availableQuantity: 100,
                isOutOfStock: false,
            })),
            concerns: p.concerns.map((c) => c.name),
            ingredients: p.ingredients.map((i) => i.name),
            skinTypes: p.skinTypes.map((s) => s.name),
            seoTitle: p.seoTitle,
            seoDesc: p.seoDesc,
            seoKeywords: p['seoKeywords'],
        }));
    }
    async exportCsv() {
        const products = await this.prisma.product.findMany({
            where: { isDeleted: false },
            include: {
                category: true,
                variants: {
                    take: 1,
                },
            },
        });
        const header = [
            'slug',
            'name',
            'categoryId',
            'status',
            'description',
            'manufacturerName',
            'manufacturerAddress',
            'countryOfOrigin',
            'testReportRef',
            'mrp',
            'discountPrice',
            'variantSku',
            'variantName',
            'variantMrp',
            'variantPrice',
        ].join(',');
        const rows = products.map((p) => {
            const v = p.variants[0] || {};
            return [
                p.slug,
                p.name,
                p.categoryId,
                p.status,
                p.description?.replace(/,/g, '') || '',
                p.manufacturerName || '',
                p.manufacturerAddress?.replace(/,/g, '') || '',
                p.countryOfOrigin || '',
                p.testReportRef || '',
                p.mrp,
                p.discountPrice || '',
                v.sku || '',
                v.name || '',
                v.mrp || '',
                v.price || '',
            ]
                .map((val) => `"${val}"`)
                .join(',');
        });
        return [header, ...rows].join('\n');
    }
    async importCsv(buffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            const errors = [];
            let successCount = 0;
            stream_1.Readable.from(buffer)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                for (const row of results) {
                    try {
                        if (!row.slug ||
                            !row.name ||
                            !row.categoryId ||
                            !row.variantSku) {
                            errors.push(`Row missing required fields: ${JSON.stringify(row)}`);
                            continue;
                        }
                        let finalStatus = row.status || 'DRAFT';
                        if (finalStatus === 'LIVE' ||
                            finalStatus === 'PENDING_APPROVAL') {
                            if (!row.manufacturerName ||
                                !row.manufacturerAddress ||
                                !row.countryOfOrigin) {
                                errors.push(`Row for ${row.slug} failed Cosmetics Rules 2020 validation. Forced to DRAFT.`);
                                finalStatus = 'DRAFT';
                            }
                        }
                        const product = await this.prisma.product.upsert({
                            where: { slug: row.slug },
                            update: {
                                name: row.name,
                                categoryId: row.categoryId,
                                status: finalStatus,
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
                                status: finalStatus,
                                description: row.description,
                                manufacturerName: row.manufacturerName,
                                manufacturerAddress: row.manufacturerAddress,
                                countryOfOrigin: row.countryOfOrigin,
                                testReportRef: row.testReportRef,
                                mrp: parseFloat(row.mrp) || 0,
                                discountPrice: parseFloat(row.discountPrice) || null,
                            },
                        });
                        await this.prisma.productVariant.upsert({
                            where: { sku: row.variantSku },
                            update: {
                                name: row.variantName || 'Default',
                                mrp: parseFloat(row.variantMrp) || parseFloat(row.mrp) || 0,
                                price: parseFloat(row.variantPrice) ||
                                    parseFloat(row.discountPrice || row.mrp) ||
                                    0,
                                productId: product.id,
                            },
                            create: {
                                sku: row.variantSku,
                                name: row.variantName || 'Default',
                                mrp: parseFloat(row.variantMrp) || parseFloat(row.mrp) || 0,
                                price: parseFloat(row.variantPrice) ||
                                    parseFloat(row.discountPrice || row.mrp) ||
                                    0,
                                productId: product.id,
                            },
                        });
                        successCount++;
                    }
                    catch (err) {
                        errors.push(`Failed to process row ${row.slug}: ${err.message}`);
                    }
                }
                resolve({
                    total: results.length,
                    success: successCount,
                    failed: results.length - successCount,
                    errors,
                });
            })
                .on('error', (error) => {
                reject(error);
            });
        });
    }
    async getReports(platform) {
        const products = await this.prisma.product.findMany({
            where: platform ? { category: { platform } } : undefined,
            include: {
                category: true,
                variants: true,
            },
        });
        let totalCatalogValue = 0;
        let totalSellingPrice = 0;
        let totalDiscountPercent = 0;
        let totalVariants = 0;
        const categoryMap = {};
        const priceTiers = {
            'Under ₹500': 0,
            '₹500 - ₹1000': 0,
            '₹1000 - ₹2000': 0,
            'Above ₹2000': 0,
        };
        products.forEach((p) => {
            const price = p.discountPrice || p.mrp;
            totalSellingPrice += price;
            totalVariants += p.variants.length;
            totalCatalogValue += price * p.variants.length;
            if (p.mrp > 0 && price < p.mrp) {
                totalDiscountPercent += ((p.mrp - price) / p.mrp) * 100;
            }
            if (p.category) {
                categoryMap[p.category.name] = (categoryMap[p.category.name] || 0) + 1;
            }
            if (price < 500)
                priceTiers['Under ₹500']++;
            else if (price <= 1000)
                priceTiers['₹500 - ₹1000']++;
            else if (price <= 2000)
                priceTiers['₹1000 - ₹2000']++;
            else
                priceTiers['Above ₹2000']++;
        });
        return {
            totalCatalogValue,
            averageSellingPrice: products.length > 0 ? totalSellingPrice / products.length : 0,
            averageDiscountPercentage: products.length > 0 ? totalDiscountPercent / products.length : 0,
            totalVariants,
            categoryDistribution: Object.entries(categoryMap).map(([name, value]) => ({ name, value })),
            pricingTiers: Object.entries(priceTiers).map(([name, count]) => ({
                name,
                count,
            })),
        };
    }
    async addBundleItem(productId, data) {
        await this.findOne(productId);
        const result = await this.prisma.productBundleItem.upsert({
            where: {
                bundleProductId_componentSku: {
                    bundleProductId: productId,
                    componentSku: data.componentSku,
                },
            },
            update: { quantity: data.quantity },
            create: {
                bundleProductId: productId,
                componentSku: data.componentSku,
                quantity: data.quantity,
            },
        });
        await this.recalculateBundlePrice(productId);
        return result;
    }
    async removeBundleItem(productId, componentSku) {
        const result = await this.prisma.productBundleItem.delete({
            where: {
                bundleProductId_componentSku: {
                    bundleProductId: productId,
                    componentSku,
                },
            },
        });
        await this.recalculateBundlePrice(productId);
        return result;
    }
    async recalculateBundlePrice(productId) {
        const bundleItems = await this.prisma.productBundleItem.findMany({
            where: { bundleProductId: productId },
        });
        if (bundleItems.length === 0)
            return;
        let totalMrp = 0;
        let totalPrice = 0;
        for (const item of bundleItems) {
            const component = await this.prisma.productVariant.findUnique({
                where: { sku: item.componentSku },
            });
            if (component) {
                totalMrp += component.mrp * item.quantity;
                totalPrice += component.price * item.quantity;
            }
        }
        await this.prisma.product.update({
            where: { id: productId },
            data: { mrp: totalMrp, discountPrice: totalPrice },
        });
        const defaultVariant = await this.prisma.productVariant.findFirst({
            where: { productId },
        });
        if (defaultVariant) {
            await this.prisma.productVariant.update({
                where: { id: defaultVariant.id },
                data: { mrp: totalMrp, price: totalPrice },
            });
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map