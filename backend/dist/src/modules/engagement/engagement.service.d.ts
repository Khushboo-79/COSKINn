import { PrismaService } from '../../prisma/prisma.service';
export declare class EngagementService {
    private prisma;
    constructor(prisma: PrismaService);
    getProductReviews(productId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        title: string | null;
        isApproved: boolean;
        rating: number;
        content: string | null;
    }[]>;
    addReview(userId: string, productId: string, data: {
        rating: number;
        title?: string;
        content?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        title: string | null;
        isApproved: boolean;
        rating: number;
        content: string | null;
    }>;
    getProductQuestions(productId: string): Promise<({
        answers: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            isApproved: boolean;
            content: string;
            questionId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        isApproved: boolean;
        content: string;
    })[]>;
    addQuestion(userId: string, productId: string, content: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        isApproved: boolean;
        content: string;
    }>;
}
