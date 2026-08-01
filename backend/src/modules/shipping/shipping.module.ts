import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [PrismaModule, OrderModule],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService]
})
export class ShippingModule {}
