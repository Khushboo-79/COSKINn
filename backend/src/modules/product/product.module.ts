import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { VariantController } from './variant.controller';
import { MediaController } from './media.controller';
import { PublicCatalogController } from './public-catalog.controller';
import { ReviewController } from './review.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    ProductController, 
    PublicCatalogController, 
    VariantController, 
    MediaController,
    ReviewController
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
