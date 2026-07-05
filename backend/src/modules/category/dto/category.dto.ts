export class CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export class UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export class CreateSubcategoryDto {
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  isActive?: boolean;
}

export class UpdateSubcategoryDto {
  categoryId?: string;
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}
