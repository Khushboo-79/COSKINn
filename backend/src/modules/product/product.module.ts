import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { VariantController } from './variant.controller';
import { MediaController } from './media.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController, VariantController, MediaController],
  providers: [ProductService],
})
export class ProductModule {}
