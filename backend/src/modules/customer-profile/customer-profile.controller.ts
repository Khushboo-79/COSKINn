import { Controller, Get, Put, Body, Headers, BadRequestException } from '@nestjs/common';
import { CustomerProfileService } from './customer-profile.service';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';

@Controller('customer/profile')
export class CustomerProfileController {
  constructor(private readonly profileService: CustomerProfileService) {}

  @Get()
  async getProfile(@Headers('x-user-id') userId: string) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required for now');
    }
    return this.profileService.getProfile(userId);
  }

  @Put()
  async updateProfile(
    @Headers('x-user-id') userId: string,
    @Body() dto: UpdateCustomerProfileDto,
  ) {
    if (!userId) {
      throw new BadRequestException('x-user-id header is required for now');
    }
    return this.profileService.upsertProfile(userId, dto);
  }
}

