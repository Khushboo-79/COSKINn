import { PrismaService } from '../../prisma/prisma.service';
export declare class WalletService {
    private prisma;
    constructor(prisma: PrismaService);
    getWallet(userId: string): Promise<{
        transactions: {
            id: string;
            createdAt: Date;
            type: string;
            expiresAt: Date | null;
            reference: string | null;
            walletId: string;
            amount: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        balance: number;
    }>;
    getAdminTransactions(): Promise<({
        wallet: {
            user: {
                id: string;
                email: string | null;
                firstName: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            balance: number;
        };
    } & {
        id: string;
        createdAt: Date;
        type: string;
        expiresAt: Date | null;
        reference: string | null;
        walletId: string;
        amount: number;
    })[]>;
    creditWallet(userId: string, amount: number, reference: string, txClient?: any): Promise<any>;
    debitWallet(userId: string, amount: number, reference: string, txClient?: any): Promise<any>;
}
