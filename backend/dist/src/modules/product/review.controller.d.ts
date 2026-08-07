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
                altText: string | null;
                isPrimary: boolean;
                sortOrder: number;
            }[];
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        rating: number;
        title: string | null;
        userId: string;
        isApproved: boolean;
        content: string | null;
    })[]>;
    approveReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        rating: number;
        title: string | null;
        userId: string;
        isApproved: boolean;
        content: string | null;
    }>;
    deleteReview(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        rating: number;
        title: string | null;
        userId: string;
        isApproved: boolean;
        content: string | null;
    }>;
}
