import { ComplianceService } from './compliance.service';
export declare class ComplianceController {
    private readonly complianceService;
    constructor(complianceService: ComplianceService);
    updateConsent(req: any, body: any): Promise<{
        id: string;
        email: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        push: boolean;
        sms: boolean;
        whatsapp: boolean;
    }>;
    getConsent(req: any): Promise<{
        id: string;
        email: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        push: boolean;
        sms: boolean;
        whatsapp: boolean;
    }>;
    createDataRequest(req: any, body: {
        requestType: 'EXPORT' | 'DELETE';
    }): Promise<{
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
    updateDataRequestStatus(id: string, body: {
        status: string;
    }): Promise<{
        id: string;
        userId: string;
        status: string;
        requestType: string;
        exceptions: string | null;
        requestedAt: Date;
        fulfilledAt: Date | null;
    }>;
}
