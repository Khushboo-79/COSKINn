import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [PrismaModule, WalletModule],
  controllers: [BonusController],
  providers: [BonusService],
  exports: [BonusService]
})
export class BonusModule {}
