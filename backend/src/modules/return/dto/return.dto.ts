import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class RequestReturnDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsString()
  @IsIn(['WALLET', 'ORIGINAL_SOURCE'])
  refundType: string;
}

export class ProcessReturnDto {
  @IsString()
  @IsIn(['APPROVED', 'REJECTED'])
  action: string;

  @IsString()
  @IsOptional()
  adminNotes?: string;
}

export class ReturnQcDto {
  @IsString()
  @IsIn(['PASS', 'FAIL'])
  qcResult: string;
}
