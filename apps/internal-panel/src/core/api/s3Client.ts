import { apiClient } from './client';

export const uploadFileToS3 = async (file: File, folder: string = 'products'): Promise<string> => {
  try {
    // 1. Ask our backend for a secure upload ticket (Presigned URL)
    const { data } = await apiClient.post('/upload/presigned-url', {
      fileName: file.name,
      contentType: file.type,
      folder
    });

    // 2. Upload the file DIRECTLY to AWS S3 using the Presigned URL
    // We use standard fetch here to avoid AWS SDK readableStream bugs
    const response = await fetch(data.presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to upload to S3: ${response.statusText}`);
    }

    // 3. Return the final public S3 URL to save in our database
    return data.finalUrl;
  } catch (error) {
    console.error("Error uploading to S3 directly:", error);
    throw error;
  }
};

export const s3Client = {
  uploadFile: uploadFileToS3
};
