import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private s3Client: S3Client;
  private readonly bucketName = process.env.AWS_S3_BUCKET || 'coskinn-media-storage';

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION || 'ap-south-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'mock',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'mock',
      },
    });
  }

  async generatePresignedUrl(fileName: string, contentType: string, folder: string = 'products') {
    // Validate file type
    if (!contentType.startsWith('image/') && !contentType.startsWith('video/')) {
      throw new BadRequestException('Invalid file type. Only images and videos are allowed.');
    }

    const uniqueId = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Sanitize filename spaces and special chars
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const key = `${folder}/${uniqueId}-${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
    });

    try {
      // URL expires in 5 minutes
      const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
      
      // The final public URL after the frontend uploads it
      const finalUrl = `https://${this.bucketName}.s3.${process.env.AWS_REGION || 'ap-south-1'}.amazonaws.com/${key}`;

      return {
        presignedUrl,
        finalUrl,
        key
      };
    } catch (error) {
      throw new BadRequestException('Could not generate presigned URL');
    }
  }
}
