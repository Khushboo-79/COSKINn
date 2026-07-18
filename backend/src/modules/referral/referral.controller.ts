import { Controller, Get, Post, Param, UseGuards, Request, Body } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get('my-code')
  @UseGuards(JwtAuthGuard)
  async getMyCode(@Request() req) {
    return this.referralService.getOrCreateMyReferralCode(req.user.id);
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  async applyReferralCode(@Request() req, @Body('code') code: string) {
    return this.referralService.processReferralSignup(code, req.user.id);
  }

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
