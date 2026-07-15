import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { InventoryModule } from '../inventory/inventory.module';
import { RewardPointModule } from '../reward-point/reward-point.module';
import { BonusModule } from '../bonus/bonus.module';
import { ReferralModule } from '../referral/referral.module';
import { OfferModule } from '../offer/offer.module';
import { InvoiceModule } from '../invoice/invoice.module';

@Module({
  imports: [
    PrismaModule, 
    forwardRef(() => InventoryModule),
    RewardPointModule,
    BonusModule,
    ReferralModule,
    OfferModule,
    InvoiceModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService]
})
export class OrderModule {}
