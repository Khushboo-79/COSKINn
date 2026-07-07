import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'PRODUCT_MANAGER', 'MARKETING') // Those who can upload media
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presigned-url')
  getPresignedUrl(@Body() body: { fileName: string; contentType: string; folder?: string }) {
    return this.uploadService.generatePresignedUrl(body.fileName, body.contentType, body.folder);
  }
}
