import { EngagementService } from './engagement.service';
export declare class EngagementController {
    private readonly engagementService;
    constructor(engagementService: EngagementService);
    getReviews(id: string): Promise<{
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
    addReview(id: string, body: {
        rating: number;
        title?: string;
        content?: string;
    }, req: any): Promise<{
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
    getQuestions(id: string): Promise<({
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
    addQuestion(id: string, content: string, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        userId: string;
        isApproved: boolean;
        content: string;
    }>;
}
