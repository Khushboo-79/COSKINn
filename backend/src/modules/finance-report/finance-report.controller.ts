import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FinanceReportService } from './finance-report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api/admin/finance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN', 'FINANCE')
export class FinanceReportController {
  constructor(private readonly financeReportService: FinanceReportService) {}

  @Get('ledgers')
  getLedgers() {
    return this.financeReportService.getLedgers();
  }

  @Post('ledgers')
  createLedger(@Body('accountName') accountName: string) {
    return this.financeReportService.createLedger(accountName);
  }

  @Post('journal-entries')
  addJournalEntry(
    @Body('ledgerId') ledgerId: string,
    @Body('type') type: 'CREDIT' | 'DEBIT',
    @Body('amount') amount: number,
    @Body('reference') reference?: string
  ) {
    return this.financeReportService.addJournalEntry(ledgerId, type, amount, reference);
  }

  @Post('settlements/sync')
  syncSettlements(@Body('settlements') settlements: any[]) {
    return this.financeReportService.syncSettlements(settlements);
  }
}

