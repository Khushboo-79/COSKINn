import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ProcessRefundDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @Min(1)
  amount: number;
}
