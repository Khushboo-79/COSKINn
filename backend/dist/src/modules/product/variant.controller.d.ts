import { ProductService } from './product.service';
import { CreateVariantDto, UpdateVariantDto } from './dto/product.dto';
export declare class VariantController {
    private readonly productService;
    constructor(productService: ProductService);
    createVariant(productId: string, createVariantDto: CreateVariantDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        mrp: number;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
    updateVariant(variantId: string, updateVariantDto: UpdateVariantDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        mrp: number;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
    removeVariant(variantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        mrp: number;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
}
