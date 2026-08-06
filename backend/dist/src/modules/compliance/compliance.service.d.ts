import { PrismaService } from '../../prisma/prisma.service';
export declare class ComplianceService {
    private prisma;
    constructor(prisma: PrismaService);
    updateConsent(userId: string, data: {
        push?: boolean;
        email?: boolean;
        sms?: boolean;
        whatsapp?: boolean;
    }): Promise<{
        id: string;
        email: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        push: boolean;
        sms: boolean;
        whatsapp: boolean;
    }>;
    getConsent(userId: string): Promise<{
        id: string;
        email: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        push: boolean;
        sms: boolean;
        whatsapp: boolean;
    }>;
    createDataRequest(userId: string, requestType: 'EXPORT' | 'DELETE'): Promise<{
        id: string;
        userId: string;
        status: string;
        requestType: string;
        exceptions: string | null;
        requestedAt: Date;
        fulfilledAt: Date | null;
    }>;
    getAdminDataRequests(): Promise<({
        user: {
            email: string | null;
            phone: string | null;
            firstName: string | null;
        };
    } & {
        id: string;
        userId: string;
        status: string;
        requestType: string;
        exceptions: string | null;
        requestedAt: Date;
        fulfilledAt: Date | null;
    })[]>;
    updateDataRequestStatus(id: string, status: string): Promise<{
        id: string;
        userId: string;
        status: string;
        requestType: string;
        exceptions: string | null;
        requestedAt: Date;
        fulfilledAt: Date | null;
    }>;
}
