import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get('admin/all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async getAllReferrals() {
    return this.referralService.getAllReferrals();
  }

  @Post('admin/:id/award')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async awardBonus(@Param('id') id: string) {
    return this.referralService.awardReferralBonus(id);
  }
}
