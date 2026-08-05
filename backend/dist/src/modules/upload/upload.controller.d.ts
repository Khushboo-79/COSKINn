import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    getPresignedUrl(body: {
        fileName: string;
        contentType: string;
        folder?: string;
    }): Promise<{
        presignedUrl: string;
        finalUrl: string;
        key: string;
    }>;
    uploadLocal(file: Express.Multer.File): {
        url: string;
    };
}
