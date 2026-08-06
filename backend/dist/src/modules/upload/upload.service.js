"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let UploadService = class UploadService {
    s3Client;
    bucketName = process.env.AWS_S3_BUCKET || 'fairenne-media-storage';
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION || 'ap-south-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock',
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock',
            },
        });
    }
    async generatePresignedUrl(fileName, contentType, folder = 'products') {
        if (!contentType.startsWith('image/') &&
            !contentType.startsWith('video/')) {
            throw new common_1.BadRequestException('Invalid file type. Only images and videos are allowed.');
        }
        const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
        const key = `${folder}/${uniqueId}-${safeFileName}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            ContentType: contentType,
        });
        try {
            const presignedUrl = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, {
                expiresIn: 300,
            });
            const finalUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;
            return {
                presignedUrl,
                finalUrl,
                key,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Could not generate presigned URL');
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map