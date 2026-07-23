import { IsOptional, IsString, IsArray } from 'class-validator';

export class UpdateCustomerProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  skinType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skinConcerns?: string[];

  @IsOptional()
  @IsString()
  makeupStyle?: string;
}
