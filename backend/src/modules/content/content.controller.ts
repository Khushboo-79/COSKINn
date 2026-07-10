import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('api')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // --- PUBLIC ENDPOINTS ---
  @Get('content/articles')
  getArticles(@Query('type') type?: 'BLOG' | 'TIP') {
    return this.contentService.getArticles(type, true); // only published
  }

  @Get('content/articles/:slug')
  getArticleBySlug(@Param('slug') slug: string) {
    return this.contentService.getArticleBySlug(slug);
  }

  @Get('content/faqs')
  getFaqs() {
    return this.contentService.getFaqs();
  }

  // --- ADMIN ENDPOINTS ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Post('admin/content/articles')
  createArticle(@Body() data: any) {
    return this.contentService.createArticle(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Put('admin/content/articles/:id')
  updateArticle(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateArticle(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Post('admin/content/faqs')
  createFaq(@Body() data: any) {
    return this.contentService.createFaq(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Put('admin/content/faqs/:id')
  updateFaq(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateFaq(id, data);
  }
}

