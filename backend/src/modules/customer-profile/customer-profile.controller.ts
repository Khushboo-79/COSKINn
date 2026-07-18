import { Controller, Get, Put, Post, Delete, Body, BadRequestException, Query, Param, UseGuards, Request } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { CustomerProfileService } from './customer-profile.service';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('customer')
export class CustomerProfileController {
  constructor(private readonly profileService: CustomerProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('skin-quiz')
  async saveSkinQuiz(@Request() req, @Body() dto: any) {
    // Stub for Skin Quiz
    // This will save the answers to CustomerProfile -> CustomerSkinProfile
    return {
      message: 'Skin quiz preferences saved successfully!',
      recommendationsUrl: '/api/customer/recommendations'
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(
    @Request() req,
    @Body() dto: UpdateCustomerProfileDto,
  ) {
    return this.profileService.upsertProfile(req.user.id, dto);
  }

  // --- Address Endpoints ---

  @UseGuards(JwtAuthGuard)
  @Get('addresses')
  async getAddresses(@Request() req) {
    return this.profileService.getAddresses(req.user.id);
  }

  @Get('addresses/serviceability')
  async checkServiceability(@Query('pincode') pincode: string) {
    // Stub implementation for ShadowFox serviceability
    // We assume any 6-digit pincode starting with 1-8 is serviceable for prepaid and COD.
    if (!pincode || pincode.length !== 6 || pincode.startsWith('9') || pincode.startsWith('0')) {
      return {
        serviceable: false,
        codAvailable: false,
        message: 'Delivery not available to this pincode'
      };
    }
    return {
      serviceable: true,
      codAvailable: true,
      message: 'Delivery is available'
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('addresses')
  async addAddress(@Request() req, @Body() dto: any) {
    return this.profileService.addAddress(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('addresses/:id')
  async updateAddress(@Request() req, @Param('id') id: string, @Body() dto: any) {
    return this.profileService.updateAddress(req.user.id, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('addresses/:id')
  async deleteAddress(@Request() req, @Param('id') id: string) {
    return this.profileService.deleteAddress(req.user.id, id);
  }

  // --- Admin Endpoints ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/all')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async getAllCustomers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string,
    @Query('platform') platform?: 'COSMETICS' | 'SKINCARE'
  ) {
    return this.profileService.getAllCustomers(Number(page), Number(limit), search, platform);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/:id/360')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async getCustomer360(@Param('id') id: string, @Query('platform') platform?: 'COSMETICS' | 'SKINCARE') {
    return this.profileService.getCustomer360(id, platform);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/:id/block')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async blockUser(@Param('id') id: string) {
    return this.profileService.updateUserStatus(id, false);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/:id/unblock')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async unblockUser(@Param('id') id: string) {
    return this.profileService.updateUserStatus(id, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/:id/reset-password')
  @Roles('SUPER_ADMIN', 'CRM_MANAGER', 'CUSTOMER_SUPPORT')
  async sendResetPasswordLink(@Param('id') id: string) {
    return this.profileService.sendResetPasswordLink(id);
  }
}
