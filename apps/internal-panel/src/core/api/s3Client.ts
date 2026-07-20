import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION || 'ap-south-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || '',
  },
});

export const uploadFileToS3 = async (file: File): Promise<string> => {
  const bucketName = import.meta.env.VITE_AWS_S3_BUCKET || 'coskinn-media-storage';
  const fileName = `products/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: file.type,
  });

  try {
    // We can generate a presigned URL locally and then put, or just directly PutObject 
    // since we have the credentials in the client. For direct upload from browser with AWS SDK:
    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read' // Assumes bucket allows public read for product images
    }));

    return `https://${bucketName}.s3.${import.meta.env.VITE_AWS_REGION || 'ap-south-1'}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
};
