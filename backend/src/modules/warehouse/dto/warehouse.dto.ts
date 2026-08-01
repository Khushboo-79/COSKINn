import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GeneratePickListDto {
  @IsArray()
  @IsString({ each: true })
  orderIds: string[];
}

export class BarcodeScanDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  barcode: string; // The SKU
}

export class CreatePurchaseOrderItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  requestedQty: number;

  @IsNumber()
  @Min(0)
  unitPrice: number;
}

export class CreatePurchaseOrderDto {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  vendorId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseOrderItemDto)
  items: CreatePurchaseOrderItemDto[];
}

export class CreateGrnItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  receivedQty: number;

  @IsNumber()
  @Min(0)
  acceptedQty: number;

  @IsNumber()
  @Min(0)
  rejectedQty: number;

  @IsString()
  reason?: string;
}

export class CreateGrnDto {
  @IsString()
  @IsNotEmpty()
  purchaseOrderId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGrnItemDto)
  items: CreateGrnItemDto[];
}
