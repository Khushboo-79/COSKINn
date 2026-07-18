import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto, UpdateTagsDto, UpdateComplianceDto, OpeningStockDto } from './dto/product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('search') search?: string,
    @Query('platform') platform?: 'COSMETICS' | 'SKINCARE',
  ) {
    return this.productService.findAll(categoryId, search, platform);
  }

  @Get('marketing-feed')
  getMarketingFeed(@Query() filters: any) {
    return this.productService.getMarketingFeed(filters);
  }

  @Get('export/csv')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  async exportCsv(@Res() res: Response) {
    const csvData = await this.productService.exportCsv();
    res.header('Content-Type', 'text/csv');
    res.attachment('products-export.csv');
    return res.send(csvData);
  }

  @Post('import/csv')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  @UseInterceptors(FileInterceptor('file'))
  async importCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    return this.productService.importCsv(file.buffer);
  }

  @Get('stats/reports')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  getReports(@Query('platform') platform?: 'COSMETICS' | 'SKINCARE') {
    return this.productService.getReports(platform);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Patch(':id/tags')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  updateTags(@Param('id') id: string, @Body() updateTagsDto: UpdateTagsDto) {
    return this.productService.updateTags(id, updateTagsDto);
  }

  @Patch(':id/compliance')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  updateCompliance(@Param('id') id: string, @Body() updateComplianceDto: UpdateComplianceDto) {
    return this.productService.updateCompliance(id, updateComplianceDto);
  }

  @Post(':id/variant/:variantId/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  initializeOpeningStock(
    @Param('id') id: string,
    @Param('variantId') variantId: string,
    @Body() openingStockDto: OpeningStockDto,
  ) {
    return this.productService.initializeOpeningStock(id, variantId, openingStockDto);
  }

  @Patch(':id/content')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  updateContent(@Param('id') id: string, @Body() updateContentDto: any) {
    return this.productService.updateContent(id, updateContentDto);
  }

  @Post(':id/submit-approval')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  submitForApproval(@Param('id') id: string) {
    return this.productService.submitForApproval(id);
  }

  @Post(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  approveProduct(@Param('id') id: string) {
    return this.productService.approveProduct(id);
  }

  @Post(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN')
  rejectProduct(@Param('id') id: string, @Body('reason') reason: string) {
    return this.productService.rejectProduct(id, reason);
  }

  @Post(':id/deactivate')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  deactivateProduct(@Param('id') id: string) {
    return this.productService.deactivateProduct(id);
  }

  @Patch(':id/seo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER', 'MARKETING_MANAGER')
  updateSeo(@Param('id') id: string, @Body() seoData: { seoTitle?: string, seoDesc?: string, seoKeywords?: string }) {
    return this.productService.updateSeo(id, seoData);
  }

  @Post(':id/bundle-items')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  addBundleItem(@Param('id') id: string, @Body() data: { componentSku: string, quantity: number }) {
    return this.productService.addBundleItem(id, data);
  }

  @Delete(':id/bundle-items/:componentSku')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'PRODUCT_MANAGER')
  removeBundleItem(@Param('id') id: string, @Param('componentSku') sku: string) {
    return this.productService.removeBundleItem(id, sku);
  }
}
