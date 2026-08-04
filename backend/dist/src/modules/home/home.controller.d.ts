import { HomeService } from './home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getDashboard(segment?: string): Promise<{
        heroBanners: {
            id: string;
            imageUrl: string;
            linkUrl: string;
            altText: string;
        }[];
        categoryRail: {
            id: string;
            name: string;
            slug: string;
            imageUrl: string | null;
        }[];
        fruitIngredientRail: {
            name: string;
            productCount: number;
        }[];
        newArrivals: ({
            variants: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                mrp: number;
                productId: string;
                sku: string;
                netQuantity: string | null;
                price: number;
            }[];
            images: {
                id: string;
                createdAt: Date;
                productId: string;
                url: string;
                altText: string | null;
                isPrimary: boolean;
                sortOrder: number;
            }[];
        } & {
            id: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            categoryId: string;
            subcategoryId: string | null;
            slug: string;
            description: string | null;
            howToUse: string | null;
            warnings: string | null;
            claims: string | null;
            mrp: number;
            discountPrice: number | null;
            gstRate: number;
            hsnCode: string | null;
            manufacturerName: string | null;
            manufacturerAddress: string | null;
            countryOfOrigin: string | null;
            storageInstructions: string | null;
            isReturnable: boolean;
            isCodAvailable: boolean;
            returnPolicy: string | null;
            testReportRef: string | null;
            status: import("@prisma/client").$Enums.ProductStatus;
            productLine: import("@prisma/client").$Enums.ProductLine;
            isCrossSegment: boolean;
            rejectionReason: string | null;
            seoTitle: string | null;
            seoDesc: string | null;
            seoKeywords: string | null;
        })[];
    }>;
}
