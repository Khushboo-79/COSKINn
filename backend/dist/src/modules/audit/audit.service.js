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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuditService = class AuditService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logEvent(action, entity, entityId, adminId, oldData, newData) {
        return this.prisma.auditLog.create({
            data: {
                action,
                entity,
                entityId,
                adminId,
                oldData: oldData ? JSON.stringify(oldData) : null,
                newData: newData ? JSON.stringify(newData) : null
            }
        });
    }
    async getLogs(page = 1, limit = 50, entity) {
        const where = entity ? { entity } : {};
        return this.prisma.auditLog.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
    }
    async seedAuditLogs() {
        const count = await this.prisma.auditLog.count();
        if (count > 0)
            return { message: 'Audit logs already seeded' };
        const logs = [
            { action: 'Modified RBAC', entity: 'Admin', entityId: '402', adminId: 'superadmin@fairenne.com', newData: JSON.stringify({ details: 'Added "Manager" role to user ID 402' }), createdAt: new Date(Date.now() - 1000000) },
            { action: 'Changed Settings', entity: 'Admin', entityId: 'global', adminId: 'rolemanager@fairenne.com', newData: JSON.stringify({ details: 'Updated global return policy window from 15 to 30 days' }), createdAt: new Date(Date.now() - 2000000) },
            { action: 'Deleted Role', entity: 'Admin', entityId: 'TempStaff', adminId: 'superadmin@fairenne.com', newData: JSON.stringify({ details: 'Removed deprecated "TempStaff" role' }), createdAt: new Date(Date.now() - 3000000) },
            { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-8801', adminId: 'productmgr@fairenne.com', oldData: JSON.stringify({ price: '₹45.00' }), newData: JSON.stringify({ productName: 'Vitamin C Face Serum', price: '₹40.00', reason: 'Summer Promo' }), createdAt: new Date(Date.now() - 4000000) },
            { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-7722', adminId: 'admin@fairenne.com', oldData: JSON.stringify({ price: '₹25.00' }), newData: JSON.stringify({ productName: 'Niacinamide Cleanser', price: '₹28.00', reason: 'Supplier cost increase' }), createdAt: new Date(Date.now() - 5000000) },
            { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-9918', adminId: 'productmgr@fairenne.com', oldData: JSON.stringify({ price: '₹55.00 (10% off)' }), newData: JSON.stringify({ productName: 'Retinol Night Cream', price: '₹55.00 (No discount)', reason: 'Promo ended' }), createdAt: new Date(Date.now() - 6000000) },
            { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-001', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-001', taxableAmount: '₹15,000.00', cgst: '₹1,350.00', sgst: '₹1,350.00', igst: '₹0.00', totalTax: '₹2,700.00', date: '2026-07-03' }), createdAt: new Date('2026-07-03') },
            { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-002', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-002', taxableAmount: '₹4,200.00', cgst: '₹0.00', sgst: '₹0.00', igst: '₹756.00', totalTax: '₹756.00', date: '2026-07-02' }), createdAt: new Date('2026-07-02') },
            { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-003', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-003', taxableAmount: '₹8,500.00', cgst: '₹765.00', sgst: '₹765.00', igst: '₹0.00', totalTax: '₹1,530.00', date: '2026-07-01' }), createdAt: new Date('2026-07-01') },
        ];
        await this.prisma.auditLog.createMany({ data: logs });
        return { message: 'Seeded audit logs' };
    }
    async getRewardUsageLog() {
        const ledgers = await this.prisma.rewardPointsLedger.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true } } }
        });
        return ledgers.map(l => ({
            id: l.id,
            timestamp: l.createdAt.toISOString(),
            user: l.user.email,
            eventType: l.type,
            value: l.points > 0 ? `+${l.points} pts` : `${l.points} pts`,
            referenceId: l.reference || 'N/A',
            flagged: l.points > 1000,
            details: l.points > 0 ? 'Points credited' : 'Points redeemed'
        }));
    }
    async getSalesReport() {
        const orders = await this.prisma.order.findMany({
            where: { status: { not: 'CANCELLED' } },
            orderBy: { createdAt: 'desc' }
        });
        const reportsMap = new Map();
        for (const o of orders) {
            const dateStr = o.createdAt.toISOString().split('T')[0];
            if (!reportsMap.has(dateStr)) {
                reportsMap.set(dateStr, {
                    id: dateStr,
                    date: dateStr,
                    totalOrders: 0,
                    grossSales: 0,
                    discounts: 0,
                    refunds: 0,
                    netSales: 0
                });
            }
            const r = reportsMap.get(dateStr);
            r.totalOrders++;
            r.grossSales += o.totalAmount + o.shippingFee + o.taxAmount;
            r.discounts += o.discountAmt;
            r.netSales += o.finalAmount;
        }
        return Array.from(reportsMap.values()).slice(0, 30);
    }
    async getSessionActivityLog() {
        const sessions = await this.prisma.loginSession.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { email: true } } }
        });
        return sessions.map(s => ({
            id: s.id,
            timestamp: s.createdAt.toISOString(),
            userEmail: s.user.email,
            eventType: 'LOGIN_SUCCESS',
            ipAddress: s.ipAddress || 'Unknown',
            deviceInfo: s.deviceInfo || 'Unknown Device',
            details: s.isRevoked ? 'Session revoked manually' : 'Standard login'
        }));
    }
    async getStockAdjustmentLog() {
        const adjustments = await this.prisma.stockAdjustment.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: { warehouse: { select: { name: true } } }
        });
        return adjustments.map(a => ({
            id: a.id,
            timestamp: a.createdAt.toISOString(),
            sku: a.sku,
            warehouse: a.warehouse.name,
            oldQty: 'N/A',
            newQty: 'N/A',
            change: a.quantity > 0 ? `+${a.quantity}` : `${a.quantity}`,
            reason: a.reason,
            adjustedBy: 'System/Admin'
        }));
    }
    async getRefundReport() {
        const returns = await this.prisma.return.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: { order: { select: { id: true, finalAmount: true, paymentMode: true, user: { select: { email: true } } } } }
        });
        return returns.map(r => ({
            id: r.id,
            initiationDate: r.createdAt.toISOString().replace('T', ' ').substring(0, 19),
            orderId: r.orderId.split('-')[0].toUpperCase(),
            customer: r.order.user ? r.order.user.email : 'Guest',
            amount: `₹${r.order.finalAmount}`,
            method: r.refundType,
            status: r.status,
            completionDate: r.status === 'RECEIVED' ? r.updatedAt.toISOString().replace('T', ' ').substring(0, 19) : '-',
            txnRef: 'rfnd_' + r.id.substring(0, 8)
        }));
    }
    async getPaymentReport() {
        const txns = await this.prisma.paymentTransaction.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' }
        });
        return txns.map(t => ({
            id: t.id,
            date: t.createdAt.toISOString().replace('T', ' ').substring(0, 19),
            orderRef: 'ORD-' + t.id.substring(0, 6).toUpperCase(),
            customer: 'customer@fairenne.com',
            amount: `₹${t.amount}`,
            gateway: 'Razorpay',
            status: t.status,
            txnRef: t.razorpayOrderId || t.id.substring(0, 12)
        }));
    }
};
exports.AuditService = AuditService;
exports.AuditService = AuditService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuditService);
//# sourceMappingURL=audit.service.js.map