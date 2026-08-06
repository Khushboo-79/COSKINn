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
        productId: string;
        mrp: number;
        sku: string;
        price: number;
        netQuantity: string | null;
    }>;
    updateVariant(variantId: string, updateVariantDto: UpdateVariantDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        productId: string;
        mrp: number;
        sku: string;
        price: number;
        netQuantity: string | null;
    }>;
    removeVariant(variantId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        productId: string;
        mrp: number;
        sku: string;
        price: number;
        netQuantity: string | null;
    }>;
}
