import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin/membership')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get('tiers')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  getTiers() {
    return this.membershipService.getTiers();
  }

  @Post('tiers')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  createTier(@Body() data: any) {
    return this.membershipService.createTier(data);
  }

  @Put('tiers/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  updateTier(@Param('id') id: string, @Body() data: any) {
    return this.membershipService.updateTier(id, data);
  }

  @Delete('tiers/:id')
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  deleteTier(@Param('id') id: string) {
    return this.membershipService.deleteTier(id);
  }
}
