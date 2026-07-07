import { Controller, Get, Put, Body, Headers, BadRequestException, Query, Param } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
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

  @Get('admin/all')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async getAllCustomers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string
  ) {
    return this.profileService.getAllCustomers(Number(page), Number(limit), search);
  }

  @Get('admin/:id/360')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async getCustomer360(@Param('id') id: string) {
    return this.profileService.getCustomer360(id);
  }
}

