import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto, CreateSubcategoryDto, UpdateSubcategoryDto } from './dto/category.dto';
export declare class CategoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllCategories(platform?: 'COSMETICS' | 'SKINCARE'): Promise<({
        subcategories: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            categoryId: string;
            slug: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.PlatformType;
        slug: string;
        productLine: import("@prisma/client").$Enums.ProductLine;
        imageUrl: string | null;
    })[]>;
    findCategory(id: string): Promise<{
        subcategories: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            categoryId: string;
            slug: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.PlatformType;
        slug: string;
        productLine: import("@prisma/client").$Enums.ProductLine;
        imageUrl: string | null;
    }>;
    createCategory(dto: CreateCategoryDto): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.PlatformType;
        slug: string;
        productLine: import("@prisma/client").$Enums.ProductLine;
        imageUrl: string | null;
    }>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.PlatformType;
        slug: string;
        productLine: import("@prisma/client").$Enums.ProductLine;
        imageUrl: string | null;
    }>;
    removeCategory(id: string): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        platform: import("@prisma/client").$Enums.PlatformType;
        slug: string;
        productLine: import("@prisma/client").$Enums.ProductLine;
        imageUrl: string | null;
    }>;
    createSubcategory(dto: CreateSubcategoryDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        categoryId: string;
        slug: string;
    } | {
        error: any;
    }>;
    updateSubcategory(id: string, dto: UpdateSubcategoryDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        categoryId: string;
        slug: string;
    }>;
    removeSubcategory(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        categoryId: string;
        slug: string;
    }>;
}
