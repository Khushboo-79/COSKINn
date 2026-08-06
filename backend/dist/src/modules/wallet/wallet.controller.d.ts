import { WalletService } from './wallet.service';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    getWallet(req: any): Promise<{
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
    creditWallet(data: {
        userId: string;
        amount: number;
        reference?: string;
        remark?: string;
    }): Promise<any>;
}
