import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class PublicCatalogController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(
    @Query('page') page?: string, 
    @Query('limit') limit?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('skinType') skinType?: string,
    @Query('fruit') fruit?: string,
    @Query('concern') concern?: string,
    @Query('sortBy') sortBy?: string,
    @Query('segment') segment?: string
  ) {
    const pageNumber = page ? parseInt(page, 10) : 1;
    const limitNumber = limit ? parseInt(limit, 10) : 20;
    return this.productService.findAllPublic(pageNumber, limitNumber, {
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      skinType,
      fruit,
      concern,
      sortBy,
      segment: segment ? (segment.toUpperCase() as any) : undefined
    });
  }

  @Get('search')
  async search(@Query('q') query: string, @Query('segment') segment?: string) {
    if (!query || query.trim() === '') {
      return [];
    }
    return this.productService.search(query, segment ? segment.toUpperCase() : undefined);
  }

  @Get('category/:id')
  async findByCategory(@Param('id') categoryId: string, @Query('segment') segment?: string) {
    return this.productService.findByCategory(categoryId, segment ? segment.toUpperCase() : undefined);
  }

  @Get('concern/:id')
  async findByConcern(@Param('id') concernId: string, @Query('segment') segment?: string) {
    return this.productService.findByConcern(concernId, segment ? segment.toUpperCase() : undefined);
  }

  @Get('fruit/:name')
  async findByFruit(@Param('name') fruitName: string, @Query('segment') segment?: string) {
    return this.productService.findByFruit(fruitName, segment ? segment.toUpperCase() : undefined);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOnePublic(id);
  }

  @Get(':id/variants')
  async getProductVariants(@Param('id') id: string) {
    return this.productService.getProductVariantsPublic(id);
  }
}
