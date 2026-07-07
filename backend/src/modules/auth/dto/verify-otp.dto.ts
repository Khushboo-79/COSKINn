import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/, { message: 'Phone number must be a valid E.164 format' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 6, { message: 'OTP must be 4 or 6 digits' })
  otp: string;
}
