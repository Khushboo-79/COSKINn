import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerProfileModule } from './modules/customer-profile/customer-profile.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [PrismaModule, CustomerProfileModule, BrandModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
