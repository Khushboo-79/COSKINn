import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray, IsBoolean } from 'class-validator';

export class UpdateContentDto {
  @IsString()
  @IsOptional()
  howToUse?: string;

  @IsString()
  @IsOptional()
  warnings?: string;

  @IsString()
  @IsOptional()
  claims?: string;

  @IsString()
  @IsOptional()
  storageInstructions?: string;

  @IsBoolean()
  @IsOptional()
  isReturnable?: boolean;

  @IsBoolean()
  @IsOptional()
  isCodAvailable?: boolean;

  @IsString()
  @IsOptional()
  returnPolicy?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];
}


export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsOptional()
  subcategoryId?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  mrp: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discountPrice?: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
  
  @IsNumber()
  @Min(0)
  @IsOptional()
  mrp?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @IsOptional()
  discountPrice?: number;
}

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  mrp: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @IsOptional()
  shadeCode?: string;

  @IsString()
  @IsOptional()
  fragrance?: string;

  @IsString()
  @IsOptional()
  flavor?: string;
}

export class UpdateVariantDto {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  mrp?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  shadeCode?: string;

  @IsString()
  @IsOptional()
  fragrance?: string;

  @IsString()
  @IsOptional()
  flavor?: string;
}

export class UpdateTagsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  concerns?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skinTypes?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];
}

export class CreateProductVideoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  title?: string;
}

export class MediaOrderItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @Min(0)
  sortOrder: number;
}

export class UpdateMediaOrderDto {
  @IsArray()
  @IsOptional()
  images?: MediaOrderItemDto[];

  @IsArray()
  @IsOptional()
  videos?: MediaOrderItemDto[];
}

export class UpdateComplianceDto {
  @IsNumber()
  @IsOptional()
  gstRate?: number;

  @IsString()
  @IsOptional()
  hsnCode?: string;

  @IsString()
  @IsOptional()
  manufacturerName?: string;

  @IsString()
  @IsOptional()
  manufacturerAddress?: string;

  @IsString()
  @IsOptional()
  countryOfOrigin?: string;
}

export class OpeningStockDto {
  @IsString()
  @IsNotEmpty()
  batchNumber: string;

  @IsString()
  @IsOptional()
  manufacturingDate?: string; // ISO String

  @IsString()
  @IsOptional()
  expiryDate?: string; // ISO String

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsOptional()
  netQuantity?: string;
}
