import { PrismaService } from '../../prisma/prisma.service';
export declare class RewardPointService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getBalance(userId: string): Promise<number>;
    getMyLedger(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        reference: string | null;
        points: number;
    }[]>;
    getAdminLedger(): Promise<({
        user: {
            id: string;
            email: string | null;
            firstName: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        type: string;
        reference: string | null;
        points: number;
    })[]>;
    earnPoints(userId: string, amountSpent: number, orderId: string): Promise<void>;
    redeemPoints(userId: string, pointsToRedeem: number, orderId: string): Promise<{
        success: boolean;
        redeemedPoints: number;
    }>;
}
