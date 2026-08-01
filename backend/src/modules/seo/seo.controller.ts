import { Controller, Get, Param, Put, Body, UseGuards } from '@nestjs/common';
import { SeoService } from './seo.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('product/:slug')
  async getProductSeo(@Param('slug') slug: string) {
    return this.seoService.getProductSeo(slug);
  }

  @Get('category/:slug')
  async getCategorySeo(@Param('slug') slug: string) {
    return this.seoService.getCategorySeo(slug);
  }

  @Get('fruit/:name')
  async getFruitSeo(@Param('name') name: string) {
    return this.seoService.getFruitSeo(name);
  }

  // --- Admin ---
  @Get('admin/global')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async getGlobalSeo() {
    return this.seoService.getGlobalSeo();
  }

  @Put('admin/global')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'MARKETING_MANAGER')
  async updateGlobalSeo(@Body() data: any) {
    return this.seoService.updateGlobalSeo(data);
  }
}
