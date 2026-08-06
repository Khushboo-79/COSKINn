import { PrismaService } from '../../prisma/prisma.service';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    getArticles(type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE', publishedOnly?: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        title: string;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }[]>;
    getArticleBySlug(slug: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        title: string;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }>;
    createArticle(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        title: string;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }>;
    updateArticle(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        title: string;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }>;
    deleteArticle(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        title: string;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }>;
    getFaqs(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        segment: import("@prisma/client").$Enums.ProductLine;
        question: string;
        answer: string;
        orderIndex: number;
    }[]>;
    createFaq(data: {
        question: string;
        answer: string;
        category?: string;
        orderIndex?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        segment: import("@prisma/client").$Enums.ProductLine;
        question: string;
        answer: string;
        orderIndex: number;
    }>;
    updateFaq(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        segment: import("@prisma/client").$Enums.ProductLine;
        question: string;
        answer: string;
        orderIndex: number;
    }>;
    deleteFaq(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        category: string | null;
        segment: import("@prisma/client").$Enums.ProductLine;
        question: string;
        answer: string;
        orderIndex: number;
    }>;
    getGlobalSeo(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        keywords: string | null;
    }>;
    updateGlobalSeo(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        keywords: string | null;
    }>;
    getVideos(): Promise<{
        id: string;
        createdAt: Date;
        url: string;
        title: string;
        size: string | null;
    }[]>;
    createVideo(data: {
        title: string;
        url: string;
        size?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        url: string;
        title: string;
        size: string | null;
    }>;
    deleteVideo(id: string): Promise<{
        id: string;
        createdAt: Date;
        url: string;
        title: string;
        size: string | null;
    }>;
}
