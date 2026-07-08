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
