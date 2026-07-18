import { Module } from '@nestjs/common';
import { ServiceablePincodeService } from './serviceable-pincode.service';
import { ServiceablePincodeController } from './serviceable-pincode.controller';

@Module({
  controllers: [ServiceablePincodeController],
  providers: [ServiceablePincodeService],
  exports: [ServiceablePincodeService],
})
export class ServiceablePincodeModule {}
