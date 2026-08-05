import { RewardPointService } from './reward-point.service';
export declare class RewardPointController {
    private readonly rewardPointService;
    constructor(rewardPointService: RewardPointService);
    getMyPoints(req: any): Promise<{
        balance: number;
        history: {
            id: string;
            createdAt: Date;
            userId: string;
            type: string;
            reference: string | null;
            points: number;
        }[];
    }>;
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
}
