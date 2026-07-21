import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @UseGuards(JwtAuthGuard)
  @Get('membership/my-tier')
  getMyTier(@Request() req) {
    return this.membershipService.getMyTier(req.user.id);
  }

  @Get('membership/tiers')
  getPublicTiers() {
    return this.membershipService.getTiers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin/membership/tiers')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getTiers() {
    return this.membershipService.getTiers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('admin/membership/tiers')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createTier(@Body() data: any) {
    return this.membershipService.createTier(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('admin/membership/tiers/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateTier(@Param('id') id: string, @Body() data: any) {
    return this.membershipService.updateTier(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('admin/membership/tiers/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteTier(@Param('id') id: string) {
    return this.membershipService.deleteTier(id);
  }
}
