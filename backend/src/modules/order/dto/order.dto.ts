import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerAddressId: string;

  @IsString()
  @IsEnum(['ONLINE', 'COD'])
  paymentMode: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
