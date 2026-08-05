import { ProductService } from './product.service';
import { CreateVariantDto, UpdateVariantDto } from './dto/product.dto';
export declare class VariantController {
    private readonly productService;
    constructor(productService: ProductService);
    createVariant(productId: string, createVariantDto: CreateVariantDto): Promise<{
        name: string;
        sku: string;
        mrp: number;
        price: number;
        id: string;
        netQuantity: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
    updateVariant(variantId: string, updateVariantDto: UpdateVariantDto): Promise<{
        name: string;
        sku: string;
        mrp: number;
        price: number;
        id: string;
        netQuantity: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
    removeVariant(variantId: string): Promise<{
        name: string;
        sku: string;
        mrp: number;
        price: number;
        id: string;
        netQuantity: string | null;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
    }>;
}
