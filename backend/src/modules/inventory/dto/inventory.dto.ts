import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class StockMovementDto {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional()
  reference?: string;
}

export class StockAdjustmentDto {
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  quantity: number; // Can be negative or positive

  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class StockTransferDto {
  @IsString()
  @IsNotEmpty()
  fromWarehouseId: string;

  @IsString()
  @IsNotEmpty()
  toWarehouseId: string;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class DamagedStockDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class ExpiredStockDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  batchNo: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}
