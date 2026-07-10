import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CustomerProfileModule } from './modules/customer-profile/customer-profile.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { OrderModule } from './modules/order/order.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ShippingModule } from './modules/shipping/shipping.module';
import { CartModule } from './modules/cart/cart.module';
import { ReturnModule } from './modules/return/return.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { UploadModule } from './modules/upload/upload.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { SeoModule } from './modules/seo/seo.module';
import { HomeModule } from './modules/home/home.module';
import { EngagementModule } from './modules/engagement/engagement.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { NotificationModule } from './modules/notification/notification.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

import { ScheduleModule } from '@nestjs/schedule';
import { PurchaseOrderModule } from './modules/purchase-order/purchase-order.module';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { RefundModule } from './modules/refund/refund.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { BonusModule } from './modules/bonus/bonus.module';
import { ReferralModule } from './modules/referral/referral.module';
import { RewardPointModule } from './modules/reward-point/reward-point.module';
import { MembershipModule } from './modules/membership/membership.module';
import { OfferModule } from './modules/offer/offer.module';
import { TaxModule } from './modules/tax/tax.module';
import { HrModule } from './modules/hr/hr.module';
import { SupportModule } from './modules/support/support.module';
import { AuditModule } from './modules/audit/audit.module';
import { FinanceReportModule } from './modules/finance-report/finance-report.module';
import { ContentModule } from './modules/content/content.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule, 
    CustomerProfileModule, 
    CategoryModule,
    ProductModule,
    AuthModule,
    InventoryModule,
    OrderModule,
    PaymentModule,
    ShippingModule,
    CartModule,
    ReturnModule,
    MarketingModule,
    UploadModule,
    CatalogModule,
    WishlistModule,
    SeoModule,
    HomeModule,
    EngagementModule,
    CouponModule,
    NotificationModule,
    InvoiceModule,
    PurchaseOrderModule,
    WarehouseModule,
    RefundModule,
    WalletModule,
    BonusModule,
    ReferralModule,
    RewardPointModule,
    MembershipModule,
    OfferModule,
    TaxModule,
    HrModule,
    SupportModule,
    AuditModule,
    FinanceReportModule,
    ContentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
