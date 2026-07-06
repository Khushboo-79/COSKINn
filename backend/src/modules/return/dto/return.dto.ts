import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateReturnStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class CreateMockReturnDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsNotEmpty()
  refundType: string;
}
