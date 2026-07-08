import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { OfferModule } from '../offer/offer.module';
import { WalletModule } from '../wallet/wallet.module';
import { RewardPointModule } from '../reward-point/reward-point.module';

@Module({
  imports: [PrismaModule, OfferModule, WalletModule, RewardPointModule],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService]
})
export class CartModule {}
