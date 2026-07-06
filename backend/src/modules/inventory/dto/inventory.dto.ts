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
