import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
export declare class ReferralService {
    private prisma;
    private walletService;
    private readonly logger;
    constructor(prisma: PrismaService, walletService: WalletService);
    getOrCreateMyReferralCode(userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }>;
    generateReferralCode(userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }>;
    getMyReferrals(userId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }[]>;
    getAllReferrals(): Promise<({
        referrer: {
            id: string;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        referee: {
            id: string;
            email: string | null;
            firstName: string | null;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    })[]>;
    processReferralSignup(referralCode: string, newUserId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }>;
    awardReferralBonus(referralId: string): Promise<void>;
}
