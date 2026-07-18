import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { RewardPointService } from './reward-point.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('reward-point')
export class RewardPointController {
  constructor(private readonly rewardPointService: RewardPointService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMyPoints(@Request() req) {
    const balance = await this.rewardPointService.getBalance(req.user.id);
    const history = await this.rewardPointService.getMyLedger(req.user.id);
    return { balance, history };
  }

  @Get('admin/ledger')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async getAdminLedger() {
    return this.rewardPointService.getAdminLedger();
  }
}
