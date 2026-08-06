import { Controller, Get, UseGuards, Request, Post, Body } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getWallet(@Request() req) {
    return this.walletService.getWallet(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'FINANCE_MANAGER')
  @Get('admin/transactions')
  getAdminTransactions() {
    return this.walletService.getAdminTransactions();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'FINANCE_MANAGER')
  @Post('admin/credit')
  creditWallet(@Body() data: { userId: string, amount: number, reference?: string, remark?: string }) {
    return this.walletService.creditWallet(data.userId, data.amount, data.reference || 'ADMIN_CREDIT');
  }
}
