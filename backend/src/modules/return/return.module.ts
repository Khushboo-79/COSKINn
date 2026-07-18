import { Module } from '@nestjs/common';
import { ReturnService } from './return.service';
import { ReturnController } from './return.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { InventoryModule } from '../inventory/inventory.module';
import { RefundModule } from '../refund/refund.module';

@Module({
  imports: [PrismaModule, InventoryModule, RefundModule],
  controllers: [ReturnController],
  providers: [ReturnService],
  exports: [ReturnService]
})
export class ReturnModule {}
