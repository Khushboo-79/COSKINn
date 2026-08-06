import { ProductService } from './product.service';
import { CreateProductVideoDto, UpdateMediaOrderDto } from './dto/product.dto';
export declare class MediaController {
    private readonly productService;
    constructor(productService: ProductService);
    uploadImage(productId: string, file: Express.Multer.File): Promise<any>;
    addVideo(productId: string, data: CreateProductVideoDto): Promise<any>;
    reorderMedia(productId: string, data: UpdateMediaOrderDto): Promise<any>;
    removeImage(productId: string, imageId: string): Promise<any>;
    removeVideo(productId: string, videoId: string): Promise<any>;
}
