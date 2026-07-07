import { IsString, IsNotEmpty, IsBoolean, IsOptional, Matches } from 'class-validator';

export class SendOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid E.164 format' })
  phone: string;

  @IsBoolean()
  @IsOptional()
  isAdminLogin?: boolean;
}
