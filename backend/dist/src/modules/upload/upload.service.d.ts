export declare class UploadService {
    private s3Client;
    private readonly bucketName;
    constructor();
    generatePresignedUrl(fileName: string, contentType: string, folder?: string): Promise<{
        presignedUrl: string;
        finalUrl: string;
        key: string;
    }>;
}
