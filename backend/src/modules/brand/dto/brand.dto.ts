export class CreateBrandDto {
  name: string;
  description?: string;
  logoUrl?: string;
  isActive?: boolean;
}

export class UpdateBrandDto {
  name?: string;
  description?: string;
  logoUrl?: string;
  isActive?: boolean;
}
