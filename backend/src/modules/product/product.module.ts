import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { VariantController } from './variant.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController, VariantController],
  providers: [ProductService],
})
export class ProductModule {}
