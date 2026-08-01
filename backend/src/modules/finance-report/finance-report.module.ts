import { Module } from '@nestjs/common';
import { FinanceReportService } from './finance-report.service';
import { FinanceReportController } from './finance-report.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FinanceReportController],
  providers: [FinanceReportService],
  exports: [FinanceReportService]
})
export class FinanceReportModule {}
