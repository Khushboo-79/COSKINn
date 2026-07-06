import { Controller, Post, Patch, Delete, Param, Body, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ProductService } from './product.service';
import { CreateProductVideoDto, UpdateMediaOrderDto } from './dto/product.dto';

import * as fs from 'fs';

// In a real application, this would use S3.
// For now, we mock it by saving locally to 'uploads/'
const uploadDir = './uploads/media';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@Controller('product/:productId/media')
export class MediaController {
  constructor(private readonly productService: ProductService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async uploadImage(
    @Param('productId') productId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Convert local path to a URL-like string.
    // In production, this would be an S3 URL returned from the presigned upload.
    const url = `http://localhost:3000/uploads/media/${file.filename}`;
    
    return this.productService.addImage(productId, url);
  }

  @Post('video')
  async addVideo(
    @Param('productId') productId: string,
    @Body() data: CreateProductVideoDto,
  ) {
    return this.productService.addVideo(productId, data);
  }

  @Patch('reorder')
  async reorderMedia(
    @Param('productId') productId: string,
    @Body() data: UpdateMediaOrderDto,
  ) {
    return this.productService.reorderMedia(productId, data);
  }

  @Delete('image/:imageId')
  async removeImage(
    @Param('productId') productId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.productService.removeImage(productId, imageId);
  }

  @Delete('video/:videoId')
  async removeVideo(
    @Param('productId') productId: string,
    @Param('videoId') videoId: string,
  ) {
    return this.productService.removeVideo(productId, videoId);
  }
}
