import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { ContentService } from './content.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  // --- PUBLIC ENDPOINTS ---
  @Get('articles')
  getArticles(@Query('type') type?: 'BLOG' | 'TIP') {
    return this.contentService.getArticles(type, true); // only published
  }

  @Get('articles/:slug')
  getArticleBySlug(@Param('slug') slug: string) {
    return this.contentService.getArticleBySlug(slug);
  }

  @Get('faqs')
  getFaqs() {
    return this.contentService.getFaqs();
  }

  // --- ADMIN ENDPOINTS ---
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Get('admin/articles')
  getAdminArticles(@Query('type') type?: 'BLOG' | 'TIP' | 'ROUTINE' | 'LEGAL' | 'PAGE') {
    return this.contentService.getArticles(type, false); // false means get all (drafts + published)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Post('admin/articles')
  createArticle(@Body() data: any) {
    return this.contentService.createArticle(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Put('admin/articles/:id')
  updateArticle(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateArticle(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Delete('admin/articles/:id')
  deleteArticle(@Param('id') id: string) {
    return this.contentService.deleteArticle(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Post('admin/faqs')
  createFaq(@Body() data: any) {
    return this.contentService.createFaq(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Put('admin/faqs/:id')
  updateFaq(@Param('id') id: string, @Body() data: any) {
    return this.contentService.updateFaq(id, data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Delete('admin/faqs/:id')
  deleteFaq(@Param('id') id: string) {
    return this.contentService.deleteFaq(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Get('admin/seo/global')
  getGlobalSeo() {
    return this.contentService.getGlobalSeo();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'CONTENT_MANAGER')
  @Put('admin/seo/global')
  updateGlobalSeo(@Body() data: any) {
    return this.contentService.updateGlobalSeo(data);
  }
}

