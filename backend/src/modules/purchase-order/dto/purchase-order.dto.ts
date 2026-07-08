import { IsString, IsNotEmpty, IsOptional, ValidateNested, IsArray, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsOptional()
  vendorId?: string;

  @IsString()
  @IsOptional()
  status?: string;
}

export class CreateGrnDto {
  @IsString()
  @IsNotEmpty()
  purchaseOrderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrnItemDto)
  items: GrnItemDto[];
}

export class GrnItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
