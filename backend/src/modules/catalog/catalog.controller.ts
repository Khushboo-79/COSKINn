import { Controller, Get, Param, Query, Post, Body, UseGuards, Request } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('home')
  getHomeDashboard() {
    return this.catalogService.getHomeDashboard();
  }

  @Get('search')
  searchProducts(@Query('q') q: string) {
    return this.catalogService.searchProducts(q);
  }

  @Get('products')
  getProducts(
    @Query('page') page?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('category') category?: string,
    @Query('skinType') skinType?: string,
    @Query('skinConcern') skinConcern?: string,
    @Query('ingredient') ingredient?: string,
    @Query('sort') sort?: string,
  ) {
    return this.catalogService.getProducts({ page, minPrice, maxPrice, category, skinType, skinConcern, ingredient, sort });
  }

  @Get('products/:slug')
  getProductBySlug(@Param('slug') slug: string) {
    return this.catalogService.getProductBySlug(slug);
  }

  @Get('products/:id/reviews')
  getProductReviews(@Param('id') id: string) {
    return this.catalogService.getProductReviews(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('products/:id/reviews')
  submitProductReview(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: { rating: number; title?: string; content?: string }
  ) {
    return this.catalogService.submitProductReview(id, req.user.id, dto);
  }

  @Get('products/:id/similar')
  getSimilarProducts(@Param('id') id: string) {
    return this.catalogService.getSimilarProducts(id);
  }

  @Get('customer/recommendations')
  getRecommendations() {
    return this.catalogService.getRecommendations();
  }

  @Get('categories/:slug')
  getCategoryBySlug(@Param('slug') slug: string) {
    return this.catalogService.getCategoryBySlug(slug);
  }

  @Get('skin-types')
  getSkinTypes() {
    return this.catalogService.getSkinTypes();
  }

  @Get('skin-concerns')
  getSkinConcerns() {
    return this.catalogService.getSkinConcerns();
  }

  @Get('ingredients')
  getIngredients() {
    return this.catalogService.getIngredients();
  }
}
