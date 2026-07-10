import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FinanceReportService {
  constructor(private prisma: PrismaService) {}

  // --- Ledgers & Journal Entries ---
  async getLedgers() {
    return this.prisma.ledger.findMany({ include: { entries: true } });
  }

  async createLedger(accountName: string) {
    return this.prisma.ledger.create({ data: { accountName } });
  }

  async addJournalEntry(ledgerId: string, type: 'CREDIT' | 'DEBIT', amount: number, reference?: string) {
    return this.prisma.$transaction(async (tx) => {
      const entry = await tx.journalEntry.create({
        data: { ledgerId, type, amount, reference }
      });

      const ledger = await tx.ledger.findUnique({ where: { id: ledgerId } });
      if (!ledger) throw new NotFoundException('Ledger not found');
      
      let newBalance = ledger.balance;
      if (type === 'CREDIT') newBalance += amount;
      if (type === 'DEBIT') newBalance -= amount;

      await tx.ledger.update({
        where: { id: ledgerId },
        data: { balance: newBalance }
      });

      return entry;
    });
  }

  // --- Razorpay Settlements ---
  async syncSettlements(settlementData: any[]) {
    // Mock syncing settlements from razorpay API
    return Promise.all(settlementData.map(data => 
      this.prisma.razorpaySettlement.upsert({
        where: { settlementId: data.id },
        update: { status: data.status, utr: data.utr },
        create: {
          settlementId: data.id,
          amount: data.amount,
          fees: data.fees,
          tax: data.tax,
          status: data.status,
          utr: data.utr
        }
      })
    ));
  }
}

// Trigger IDE re-parse
