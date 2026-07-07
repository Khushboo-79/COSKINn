import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VariantController } from './variant.controller';
import { MediaController } from './media.controller';
import { PublicCatalogController } from './public-catalog.controller';

@Module({
  controllers: [ProductController, VariantController, MediaController, PublicCatalogController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
