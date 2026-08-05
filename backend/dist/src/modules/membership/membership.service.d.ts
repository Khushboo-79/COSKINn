import { PrismaService } from '../../prisma/prisma.service';
export declare class MembershipService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    computeTiersNightly(): Promise<void>;
    getMyTier(userId: string): Promise<{
        tier: {
            id: string;
            createdAt: Date;
            name: string;
            minSpend: number;
            multiplier: number;
        } | null;
        historyUrl: string;
    }>;
    getTiers(): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }[]>;
    createTier(data: {
        name: string;
        minSpend: number;
        multiplier: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        name: string;
        minSpend: number;
        multiplier: number;
    }>;
    updateTier(id: string, data: {
        name?: string;
        minSpend?: number;
        multiplier?: number;
    }): Promise<{
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
