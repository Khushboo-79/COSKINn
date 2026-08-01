import { Module } from '@nestjs/common';
import { RefundService } from './refund.service';
import { RefundController } from './refund.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { WalletModule } from '../wallet/wallet.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [PrismaModule, WalletModule, PaymentModule],
  controllers: [RefundController],
  providers: [RefundService],
  exports: [RefundService]
})
export class RefundModule {}
