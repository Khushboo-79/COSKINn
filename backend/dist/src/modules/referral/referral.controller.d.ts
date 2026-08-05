import { ReferralService } from './referral.service';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    getMyCode(req: any): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }>;
    applyReferralCode(req: any, code: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        referrerId: string;
        refereeId: string | null;
        referralCode: string;
        bonusAwarded: boolean;
    }>;
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
    awardBonus(id: string): Promise<void>;
}
