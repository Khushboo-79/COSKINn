"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceReportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FinanceReportService = class FinanceReportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLedgers() {
        return this.prisma.ledger.findMany({ include: { entries: true } });
    }
    async createLedger(accountName) {
        return this.prisma.ledger.create({ data: { accountName } });
    }
    async addJournalEntry(ledgerId, type, amount, reference) {
        return this.prisma.$transaction(async (tx) => {
            const entry = await tx.journalEntry.create({
                data: { ledgerId, type, amount, reference }
            });
            const ledger = await tx.ledger.findUnique({ where: { id: ledgerId } });
            if (!ledger)
                throw new common_1.NotFoundException('Ledger not found');
            let newBalance = ledger.balance;
            if (type === 'CREDIT')
                newBalance += amount;
            if (type === 'DEBIT')
                newBalance -= amount;
            await tx.ledger.update({
                where: { id: ledgerId },
                data: { balance: newBalance }
            });
            return entry;
        });
    }
    async syncSettlements(settlementData) {
        return Promise.all(settlementData.map(data => this.prisma.razorpaySettlement.upsert({
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
        })));
    }
    async getOverview() {
        const [orders, entries, returns] = await Promise.all([
            this.prisma.order.findMany({
                where: { status: { not: 'CANCELLED' } }
            }),
            this.prisma.journalEntry.findMany({
                where: { type: 'DEBIT' }
            }),
            this.prisma.return.findMany({
                where: { status: 'RECEIVED' },
                include: { order: true }
            })
        ]);
        const revenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
        const expenses = entries.reduce((sum, entry) => sum + entry.amount, 0);
        const profit = revenue - expenses;
        const pendingOrders = orders.filter(o => o.status !== 'DELIVERED');
        const pendingPayments = pendingOrders.reduce((sum, order) => sum + order.finalAmount, 0);
        const refunds = returns.reduce((sum, ret) => sum + ret.order.finalAmount, 0);
        const taxes = orders.reduce((sum, order) => sum + order.taxAmount, 0);
        const now = new Date();
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        const calculateTrend = (current, previous) => {
            if (previous === 0)
                return current > 0 ? '+100%' : '0%';
            const percent = ((current - previous) / previous) * 100;
            const sign = percent > 0 ? '+' : '';
            return `${sign}${percent.toFixed(1)}%`;
        };
        const currentOrders = orders.filter(o => o.createdAt >= thirtyDaysAgo);
        const prevOrders = orders.filter(o => o.createdAt >= sixtyDaysAgo && o.createdAt < thirtyDaysAgo);
        const currentRevenue = currentOrders.reduce((sum, order) => sum + order.finalAmount, 0);
        const prevRevenue = prevOrders.reduce((sum, order) => sum + order.finalAmount, 0);
        const currentEntries = entries.filter(e => e.createdAt >= thirtyDaysAgo);
        const prevEntries = entries.filter(e => e.createdAt >= sixtyDaysAgo && e.createdAt < thirtyDaysAgo);
        const currentExpenses = currentEntries.reduce((sum, entry) => sum + entry.amount, 0);
        const prevExpenses = prevEntries.reduce((sum, entry) => sum + entry.amount, 0);
        const currentProfit = currentRevenue - currentExpenses;
        const prevProfit = prevRevenue - prevExpenses;
        const revenueTrend = calculateTrend(currentRevenue, prevRevenue);
        const expenseTrend = calculateTrend(currentExpenses, prevExpenses);
        const profitTrend = calculateTrend(currentProfit, prevProfit);
        return {
            revenue,
            expenses,
            profit,
            pendingPayments,
            refunds,
            taxes,
            revenueTrend,
            expenseTrend,
            profitTrend
        };
    }
    async getTransactions() {
        const orders = await this.prisma.order.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        });
        return orders.map(order => ({
            id: order.id.split('-')[0].toUpperCase(),
            date: order.createdAt.toISOString().split('T')[0],
            type: 'Sale',
            customer: `${order.user.firstName} ${order.user.lastName}`,
            amount: order.finalAmount,
            status: order.status === 'DELIVERED' ? 'Completed' : 'Pending'
        }));
    }
    async getMonthlyBreakdown() {
        const currentYear = new Date().getFullYear();
        const [orders, entries, returns] = await Promise.all([
            this.prisma.order.findMany({
                where: {
                    createdAt: {
                        gte: new Date(`${currentYear}-01-01`),
                        lte: new Date(`${currentYear}-12-31`)
                    },
                    status: { not: 'CANCELLED' }
                }
            }),
            this.prisma.journalEntry.findMany({
                where: {
                    createdAt: {
                        gte: new Date(`${currentYear}-01-01`),
                        lte: new Date(`${currentYear}-12-31`)
                    },
                    type: 'DEBIT'
                }
            }),
            this.prisma.return.findMany({
                where: {
                    createdAt: {
                        gte: new Date(`${currentYear}-01-01`),
                        lte: new Date(`${currentYear}-12-31`)
                    },
                    status: 'RECEIVED'
                },
                include: { order: true }
            })
        ]);
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const breakdown = monthNames.map((month, index) => {
            const monthOrders = orders.filter(o => o.createdAt.getMonth() === index);
            const monthEntries = entries.filter(e => e.createdAt.getMonth() === index);
            const monthReturns = returns.filter(r => r.createdAt.getMonth() === index);
            const revenue = monthOrders.reduce((sum, order) => sum + order.finalAmount, 0);
            const tax = monthOrders.reduce((sum, order) => sum + order.taxAmount, 0);
            const expenses = monthEntries.reduce((sum, entry) => sum + entry.amount, 0);
            const refunds = monthReturns.reduce((sum, ret) => sum + (ret.order?.finalAmount || 0), 0);
            const net = revenue - expenses - refunds;
            return {
                month,
                revenue,
                expenses,
                tax,
                refunds,
                net
            };
        });
        const currentMonth = new Date().getMonth();
        return breakdown.slice(0, currentMonth + 1);
    }
    async getNotes() {
        return this.prisma.financialNote.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }
    async createNote(type, referenceType, referenceId, amount, reason) {
        return this.prisma.financialNote.create({
            data: {
                type,
                referenceType,
                referenceId,
                amount,
                reason,
                status: 'DRAFT'
            }
        });
    }
    async updateNoteStatus(id, status) {
        return this.prisma.financialNote.update({
            where: { id },
            data: { status }
        });
    }
};
exports.FinanceReportService = FinanceReportService;
exports.FinanceReportService = FinanceReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceReportService);
//# sourceMappingURL=finance-report.service.js.map