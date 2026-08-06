import { ProductService } from './product.service';
import { CreateVariantDto, UpdateVariantDto } from './dto/product.dto';
export declare class VariantController {
    private readonly productService;
    constructor(productService: ProductService);
    createVariant(productId: string, createVariantDto: CreateVariantDto): Promise<{
        id: string;
        name: string;
        mrp: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
    updateVariant(variantId: string, updateVariantDto: UpdateVariantDto): Promise<{
        id: string;
        name: string;
        mrp: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
    removeVariant(variantId: string): Promise<{
        id: string;
        name: string;
        mrp: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        sku: string;
        netQuantity: string | null;
        price: number;
    }>;
}
