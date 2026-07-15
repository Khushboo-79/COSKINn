import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logEvent(action: string, entity: string, entityId: string, adminId?: string, oldData?: any, newData?: any) {
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

  async getLogs(page = 1, limit = 50, entity?: string) {
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
    if (count > 0) return { message: 'Audit logs already seeded' };

    const logs = [
      // Admin Activity
      { action: 'Modified RBAC', entity: 'Admin', entityId: '402', adminId: 'superadmin@coskinn.com', newData: JSON.stringify({ details: 'Added "Manager" role to user ID 402' }), createdAt: new Date(Date.now() - 1000000) },
      { action: 'Changed Settings', entity: 'Admin', entityId: 'global', adminId: 'rolemanager@coskinn.com', newData: JSON.stringify({ details: 'Updated global return policy window from 15 to 30 days' }), createdAt: new Date(Date.now() - 2000000) },
      { action: 'Deleted Role', entity: 'Admin', entityId: 'TempStaff', adminId: 'superadmin@coskinn.com', newData: JSON.stringify({ details: 'Removed deprecated "TempStaff" role' }), createdAt: new Date(Date.now() - 3000000) },

      // Product Price Changes
      { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-8801', adminId: 'productmgr@coskinn.com', oldData: JSON.stringify({ price: '₹45.00' }), newData: JSON.stringify({ productName: 'Vitamin C Face Serum', price: '₹40.00', reason: 'Summer Promo' }), createdAt: new Date(Date.now() - 4000000) },
      { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-7722', adminId: 'admin@coskinn.com', oldData: JSON.stringify({ price: '₹25.00' }), newData: JSON.stringify({ productName: 'Niacinamide Cleanser', price: '₹28.00', reason: 'Supplier cost increase' }), createdAt: new Date(Date.now() - 5000000) },
      { action: 'Updated Price', entity: 'ProductPrice', entityId: 'SKU-9918', adminId: 'productmgr@coskinn.com', oldData: JSON.stringify({ price: '₹55.00 (10% off)' }), newData: JSON.stringify({ productName: 'Retinol Night Cream', price: '₹55.00 (No discount)', reason: 'Promo ended' }), createdAt: new Date(Date.now() - 6000000) },

      // Tax Reports
      { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-001', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-001', taxableAmount: '₹15,000.00', cgst: '₹1,350.00', sgst: '₹1,350.00', igst: '₹0.00', totalTax: '₹2,700.00', date: '2026-07-03' }), createdAt: new Date('2026-07-03') },
      { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-002', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-002', taxableAmount: '₹4,200.00', cgst: '₹0.00', sgst: '₹0.00', igst: '₹756.00', totalTax: '₹756.00', date: '2026-07-02' }), createdAt: new Date('2026-07-02') },
      { action: 'Tax Collected', entity: 'TaxReport', entityId: 'INV-2026-07-003', adminId: 'system', newData: JSON.stringify({ invoiceNumber: 'INV-2026-07-003', taxableAmount: '₹8,500.00', cgst: '₹765.00', sgst: '₹765.00', igst: '₹0.00', totalTax: '₹1,530.00', date: '2026-07-01' }), createdAt: new Date('2026-07-01') },
    ];

    await this.prisma.auditLog.createMany({ data: logs });
    return { message: 'Seeded audit logs' };
  }
}
