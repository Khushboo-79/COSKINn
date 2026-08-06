"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const customer_profile_module_1 = require("./modules/customer-profile/customer-profile.module");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const auth_module_1 = require("./modules/auth/auth.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const order_module_1 = require("./modules/order/order.module");
const payment_module_1 = require("./modules/payment/payment.module");
const shipping_module_1 = require("./modules/shipping/shipping.module");
const cart_module_1 = require("./modules/cart/cart.module");
const return_module_1 = require("./modules/return/return.module");
const marketing_module_1 = require("./modules/marketing/marketing.module");
const upload_module_1 = require("./modules/upload/upload.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const wishlist_module_1 = require("./modules/wishlist/wishlist.module");
const seo_module_1 = require("./modules/seo/seo.module");
const home_module_1 = require("./modules/home/home.module");
const engagement_module_1 = require("./modules/engagement/engagement.module");
const coupon_module_1 = require("./modules/coupon/coupon.module");
const notification_module_1 = require("./modules/notification/notification.module");
const invoice_module_1 = require("./modules/invoice/invoice.module");
const schedule_1 = require("@nestjs/schedule");
const purchase_order_module_1 = require("./modules/purchase-order/purchase-order.module");
const warehouse_module_1 = require("./modules/warehouse/warehouse.module");
const refund_module_1 = require("./modules/refund/refund.module");
const wallet_module_1 = require("./modules/wallet/wallet.module");
const bonus_module_1 = require("./modules/bonus/bonus.module");
const referral_module_1 = require("./modules/referral/referral.module");
const reward_point_module_1 = require("./modules/reward-point/reward-point.module");
const membership_module_1 = require("./modules/membership/membership.module");
const offer_module_1 = require("./modules/offer/offer.module");
const tax_module_1 = require("./modules/tax/tax.module");
const hr_module_1 = require("./modules/hr/hr.module");
const support_module_1 = require("./modules/support/support.module");
const audit_module_1 = require("./modules/audit/audit.module");
const finance_report_module_1 = require("./modules/finance-report/finance-report.module");
const content_module_1 = require("./modules/content/content.module");
const admin_module_1 = require("./modules/admin/admin.module");
const supplier_module_1 = require("./modules/supplier/supplier.module");
const serviceable_pincode_module_1 = require("./modules/serviceable-pincode/serviceable-pincode.module");
const compliance_module_1 = require("./modules/compliance/compliance.module");
const app_version_module_1 = require("./modules/app-version/app-version.module");
const location_module_1 = require("./modules/location/location.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            prisma_module_1.PrismaModule,
            customer_profile_module_1.CustomerProfileModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
            auth_module_1.AuthModule,
            inventory_module_1.InventoryModule,
            order_module_1.OrderModule,
            payment_module_1.PaymentModule,
            shipping_module_1.ShippingModule,
            cart_module_1.CartModule,
            return_module_1.ReturnModule,
            marketing_module_1.MarketingModule,
            upload_module_1.UploadModule,
            catalog_module_1.CatalogModule,
            wishlist_module_1.WishlistModule,
            seo_module_1.SeoModule,
            home_module_1.HomeModule,
            engagement_module_1.EngagementModule,
            coupon_module_1.CouponModule,
            notification_module_1.NotificationModule,
            invoice_module_1.InvoiceModule,
            purchase_order_module_1.PurchaseOrderModule,
            warehouse_module_1.WarehouseModule,
            refund_module_1.RefundModule,
            wallet_module_1.WalletModule,
            bonus_module_1.BonusModule,
            referral_module_1.ReferralModule,
            reward_point_module_1.RewardPointModule,
            membership_module_1.MembershipModule,
            offer_module_1.OfferModule,
            tax_module_1.TaxModule,
            hr_module_1.HrModule,
            support_module_1.SupportModule,
            audit_module_1.AuditModule,
            finance_report_module_1.FinanceReportModule,
            content_module_1.ContentModule,
            admin_module_1.AdminModule,
            supplier_module_1.SupplierModule,
            serviceable_pincode_module_1.ServiceablePincodeModule,
            compliance_module_1.ComplianceModule,
            app_version_module_1.AppVersionModule,
            location_module_1.LocationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map