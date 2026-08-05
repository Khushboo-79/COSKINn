import { AuditService } from './audit.service';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    getLogs(page: string, limit: string, entity?: string): Promise<{
        id: string;
        createdAt: Date;
        action: string;
        entity: string;
        entityId: string;
        adminId: string | null;
        oldData: string | null;
        newData: string | null;
    }[]>;
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
