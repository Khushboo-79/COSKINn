import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { RefundService } from './refund.service';
import { ProcessRefundDto } from './dto/refund.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('refunds')
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'FINANCE')
  @Post('process/wallet')
  processWalletRefund(@Body() dto: ProcessRefundDto) {
    return this.refundService.processRefund(dto, 'WALLET');
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN', 'FINANCE')
  @Post('process/original-source')
  processOriginalSourceRefund(@Body() dto: ProcessRefundDto) {
    return this.refundService.processRefund(dto, 'ORIGINAL_SOURCE');
  }
}
