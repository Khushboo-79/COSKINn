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
                productId: string;
                mrp: number;
                sku: string;
                price: number;
                netQuantity: string | null;
            }[];
            images: {
                id: string;
                createdAt: Date;
                productId: string;
                url: string;
                sortOrder: number;
                altText: string | null;
                isPrimary: boolean;
            }[];
        } & {
            hsnCode: string | null;
            id: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
            categoryId: string;
            subcategoryId: string | null;
            slug: string;
            howToUse: string | null;
            warnings: string | null;
            claims: string | null;
            mrp: number;
            discountPrice: number | null;
            gstRate: number;
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
