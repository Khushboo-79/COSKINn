import { PrismaService } from '../../prisma/prisma.service';
export declare class ReviewController {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(search?: string, status?: string): Promise<({
        user: {
            email: string | null;
            firstName: string | null;
            lastName: string | null;
        };
        product: {
            name: string;
            images: {
                id: string;
                createdAt: Date;
                productId: string;
                url: string;
                sortOrder: number;
                altText: string | null;
                isPrimary: boolean;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        title: string | null;
        isApproved: boolean;
        rating: number;
        content: string | null;
    })[]>;
    approveReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        title: string | null;
        isApproved: boolean;
        rating: number;
        content: string | null;
    }>;
    deleteReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        productId: string;
        title: string | null;
        isApproved: boolean;
        rating: number;
        content: string | null;
    }>;
}
