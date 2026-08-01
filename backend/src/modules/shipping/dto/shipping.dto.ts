import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ServiceabilityCheckDto {
  @IsString()
  @IsNotEmpty()
  pincode: string;
}

export class CreateShipmentDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @Min(1)
  weightGrams: number;
}
