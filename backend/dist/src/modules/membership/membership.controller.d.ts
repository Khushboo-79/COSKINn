import { MembershipService } from './membership.service';
export declare class MembershipController {
    private readonly membershipService;
    constructor(membershipService: MembershipService);
    getMyTier(req: any): Promise<{
        tier: {
            id: string;
            createdAt: Date;
            name: string;
            minSpend: number;
            multiplier: number;
        } | null;
        historyUrl: string;
    }>;
    getPublicTiers(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }[]>;
    getTiers(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }[]>;
    createTier(data: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }>;
    updateTier(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }>;
    deleteTier(id: string): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }>;
}
