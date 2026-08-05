import { PrismaService } from '../../prisma/prisma.service';
import { WalletService } from '../wallet/wallet.service';
export declare class BonusService {
    private prisma;
    private walletService;
    private readonly logger;
    constructor(prisma: PrismaService, walletService: WalletService);
    awardSignupBonus(userId: string): Promise<void>;
    awardFirstOrderBonus(userId: string): Promise<void>;
}
