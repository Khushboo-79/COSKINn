import { PrismaService } from '../../prisma/prisma.service';
export declare class AuditService {
    private prisma;
    constructor(prisma: PrismaService);
    logEvent(action: string, entity: string, entityId: string, adminId?: string, oldData?: any, newData?: any): Promise<{
        id: string;
        createdAt: Date;
        action: string;
        entity: string;
        entityId: string;
        adminId: string | null;
        oldData: string | null;
        newData: string | null;
    }>;
    getLogs(page?: number, limit?: number, entity?: string): Promise<{
        id: string;
        createdAt: Date;
        action: string;
        entity: string;
        entityId: string;
        adminId: string | null;
        oldData: string | null;
        newData: string | null;
    }[]>;
    seedAuditLogs(): Promise<{
        message: string;
    }>;
    getRewardUsageLog(): Promise<{
        id: string;
        timestamp: string;
        user: string | null;
        eventType: string;
        value: string;
        referenceId: string;
        flagged: boolean;
        details: string;
    }[]>;
    getSalesReport(): Promise<any[]>;
    getSessionActivityLog(): Promise<{
        id: string;
        timestamp: string;
        userEmail: string | null;
        eventType: string;
        ipAddress: string;
        deviceInfo: string;
        details: string;
    }[]>;
    getStockAdjustmentLog(): Promise<{
        id: string;
        timestamp: string;
        sku: string;
        warehouse: string;
        oldQty: string;
        newQty: string;
        change: string;
        reason: string;
        adjustedBy: string;
    }[]>;
    getRefundReport(): Promise<{
        id: string;
        initiationDate: string;
        orderId: string;
        customer: string | null;
        amount: string;
        method: string;
        status: string;
        completionDate: string;
        txnRef: string;
    }[]>;
    getPaymentReport(): Promise<{
        id: string;
        date: string;
        orderRef: string;
        customer: string;
        amount: string;
        gateway: string;
        status: string;
        txnRef: string;
    }[]>;
}
