import { Controller, Get, Param } from '@nestjs/common';
import { SeoService } from './seo.service';

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
}
