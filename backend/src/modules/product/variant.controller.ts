import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateVariantDto, UpdateVariantDto } from './dto/product.dto';

@Controller('product/:productId/variant')
export class VariantController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  createVariant(
    @Param('productId') productId: string,
    @Body() createVariantDto: CreateVariantDto,
  ) {
    return this.productService.createVariant(productId, createVariantDto);
  }

  @Patch(':variantId')
  updateVariant(
    @Param('variantId') variantId: string,
    @Body() updateVariantDto: UpdateVariantDto,
  ) {
    return this.productService.updateVariant(variantId, updateVariantDto);
  }

  @Delete(':variantId')
  removeVariant(@Param('variantId') variantId: string) {
    return this.productService.removeVariant(variantId);
  }
}
