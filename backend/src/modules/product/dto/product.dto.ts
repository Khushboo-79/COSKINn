import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsArray } from 'class-validator';

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
  brandId: string;

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
