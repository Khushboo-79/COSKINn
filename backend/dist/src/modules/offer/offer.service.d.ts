import { PrismaService } from '../../prisma/prisma.service';
export declare class OfferService {
    private prisma;
    constructor(prisma: PrismaService);
    evaluateBestOffer(cartItems: any[], cartTotal: number): Promise<{
        discount: number;
        offer: any;
    }>;
    getTieredOfferProgress(cartTotal: number): Promise<any[]>;
}
