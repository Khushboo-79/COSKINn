import { PrismaService } from '../../prisma/prisma.service';
export declare class SeoService {
    private prisma;
    constructor(prisma: PrismaService);
    getProductSeo(slug: string): Promise<{
        title: string;
        description: string | undefined;
        keywords: string;
        segment: import("@prisma/client").$Enums.ProductLine;
        isCrossSegment: boolean;
    }>;
    getCategorySeo(slug: string): Promise<{
        title: string;
        description: string;
        keywords: string;
        segment: import("@prisma/client").$Enums.ProductLine;
    }>;
    getFruitSeo(name: string): Promise<{
        title: string;
        description: string;
        keywords: string;
    }>;
    getGlobalSeo(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        keywords: string | null;
    }>;
    updateGlobalSeo(data: {
        title?: string;
        description?: string;
        keywords?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        keywords: string | null;
    }>;
}
