import { ContentService } from './content.service';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    getArticles(type?: 'BLOG' | 'TIP'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
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
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
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
    getAdminArticles(type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE'): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }[]>;
    createArticle(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        seoTitle: string | null;
        seoDesc: string | null;
        seoKeywords: string | null;
        type: string;
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
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
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
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
        title: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        contentJson: string;
        heroImageUrl: string | null;
        published: boolean;
    }>;
    createFaq(data: any): Promise<{
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
    createVideo(data: any): Promise<{
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
