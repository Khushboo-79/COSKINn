import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto, CreateSubcategoryDto, UpdateSubcategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    findAllCategories(platform?: 'COSMETICS' | 'SKINCARE'): Promise<({
        subcategories: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            categoryId: string;
            slug: string;
            description: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        productLine: import("@prisma/client").$Enums.ProductLine;
        platform: import("@prisma/client").$Enums.PlatformType;
        imageUrl: string | null;
    })[]>;
    findCategory(id: string): Promise<{
        subcategories: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            categoryId: string;
            slug: string;
            description: string | null;
        }[];
    } & {
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        productLine: import("@prisma/client").$Enums.ProductLine;
        platform: import("@prisma/client").$Enums.PlatformType;
        imageUrl: string | null;
    }>;
    createCategory(dto: CreateCategoryDto): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        productLine: import("@prisma/client").$Enums.ProductLine;
        platform: import("@prisma/client").$Enums.PlatformType;
        imageUrl: string | null;
    }>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        productLine: import("@prisma/client").$Enums.ProductLine;
        platform: import("@prisma/client").$Enums.PlatformType;
        imageUrl: string | null;
    }>;
    removeCategory(id: string): Promise<{
        id: string;
        isActive: boolean;
        isDeleted: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        slug: string;
        description: string | null;
        productLine: import("@prisma/client").$Enums.ProductLine;
        platform: import("@prisma/client").$Enums.PlatformType;
        imageUrl: string | null;
    }>;
    createSubcategory(dto: CreateSubcategoryDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryId: string;
        slug: string;
        description: string | null;
    } | {
        error: any;
    }>;
    updateSubcategory(id: string, dto: UpdateSubcategoryDto): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryId: string;
        slug: string;
        description: string | null;
    }>;
    removeSubcategory(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        categoryId: string;
        slug: string;
        description: string | null;
    }>;
}
