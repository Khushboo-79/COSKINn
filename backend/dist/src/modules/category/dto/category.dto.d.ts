export declare class CreateCategoryDto {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
    platform?: 'COSMETICS' | 'SKINCARE';
}
export declare class UpdateCategoryDto {
    name?: string;
    slug?: string;
    description?: string;
    imageUrl?: string;
    isActive?: boolean;
    platform?: 'COSMETICS' | 'SKINCARE';
}
export declare class CreateSubcategoryDto {
    categoryId: string;
    name: string;
    slug: string;
    description?: string;
    isActive?: boolean;
}
export declare class UpdateSubcategoryDto {
    categoryId?: string;
    name?: string;
    slug?: string;
    description?: string;
    isActive?: boolean;
}
