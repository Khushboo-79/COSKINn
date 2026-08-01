export class CreateServiceablePincodeDto {
  code: string;
  city?: string;
  state?: string;
  isActive?: boolean;
}

export class UpdateServiceablePincodeDto {
  city?: string;
  state?: string;
  isActive?: boolean;
}
