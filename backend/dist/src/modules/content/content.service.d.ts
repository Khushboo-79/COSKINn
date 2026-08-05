import { PrismaService } from '../../prisma/prisma.service';
export declare class ContentService {
    private prisma;
    constructor(prisma: PrismaService);
    getArticles(type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE', publishedOnly?: boolean): Promise<{
        id: string;
        title: string;
        slug: string;
        type: string;
        contentJson: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        heroImageUrl: string | null;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getArticleBySlug(slug: string): Promise<{
        id: string;
        title: string;
        slug: string;
        type: string;
        contentJson: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        heroImageUrl: string | null;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createArticle(data: any): Promise<{
        id: string;
        title: string;
        slug: string;
        type: string;
        contentJson: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        heroImageUrl: string | null;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateArticle(id: string, data: any): Promise<{
        id: string;
        title: string;
        slug: string;
        type: string;
        contentJson: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        heroImageUrl: string | null;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteArticle(id: string): Promise<{
        id: string;
        title: string;
        slug: string;
        type: string;
        contentJson: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        heroImageUrl: string | null;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getFaqs(): Promise<{
        id: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        orderIndex: number;
    }[]>;
    createFaq(data: {
        question: string;
        answer: string;
        category?: string;
        orderIndex?: number;
    }): Promise<{
        id: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        orderIndex: number;
    }>;
    updateFaq(id: string, data: any): Promise<{
        id: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        orderIndex: number;
    }>;
    deleteFaq(id: string): Promise<{
        id: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        createdAt: Date;
        updatedAt: Date;
        question: string;
        answer: string;
        category: string | null;
        orderIndex: number;
    }>;
    getGlobalSeo(): Promise<{
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        keywords: string | null;
    }>;
    updateGlobalSeo(data: any): Promise<{
        id: string;
        title: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        keywords: string | null;
    }>;
    getVideos(): Promise<any>;
    createVideo(data: {
        title: string;
        url: string;
        size?: string;
    }): Promise<any>;
    deleteVideo(id: string): Promise<any>;
}
