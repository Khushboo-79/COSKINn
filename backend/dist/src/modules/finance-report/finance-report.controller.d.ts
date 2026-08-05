import { FinanceReportService } from './finance-report.service';
export declare class FinanceReportController {
    private readonly financeReportService;
    constructor(financeReportService: FinanceReportService);
    getOverview(): Promise<{
        revenue: number;
        expenses: number;
        profit: number;
        pendingPayments: number;
        refunds: number;
        taxes: number;
        revenueTrend: string;
        expenseTrend: string;
        profitTrend: string;
    }>;
    getTransactions(): Promise<{
        id: string;
        date: string;
        type: string;
        customer: string;
        amount: number;
        status: string;
    }[]>;
    getMonthlyBreakdown(): Promise<{
        month: string;
        revenue: number;
        expenses: number;
        tax: number;
        refunds: number;
        net: number;
    }[]>;
    getLedgers(): Promise<({
        entries: {
            id: string;
            createdAt: Date;
            type: string;
            reference: string | null;
            amount: number;
            ledgerId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        accountName: string;
    })[]>;
    createLedger(accountName: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        balance: number;
        accountName: string;
    }>;
    addJournalEntry(ledgerId: string, type: 'CREDIT' | 'DEBIT', amount: number, reference?: string): Promise<{
        id: string;
        createdAt: Date;
        type: string;
        reference: string | null;
        amount: number;
        ledgerId: string;
    }>;
    syncSettlements(settlements: any[]): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        amount: number;
        settlementId: string;
        fees: number;
        tax: number;
        utr: string | null;
    }[]>;
    getNotes(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string;
        amount: number;
        referenceType: string;
        referenceId: string;
    }[]>;
    createNote(type: string, referenceType: string, referenceId: string, amount: number, reason: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string;
        amount: number;
        referenceType: string;
        referenceId: string;
    }>;
    updateNoteStatus(id: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        type: string;
        reason: string;
        amount: number;
        referenceType: string;
        referenceId: string;
    }>;
}
