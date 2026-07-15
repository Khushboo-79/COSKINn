import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { TaxService } from './tax.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('admin/tax')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get('hsn')
  getHsnCodes() {
    return this.taxService.getHsnCodes();
  }

  @Post('hsn')
  createHsnCode(@Body() body: { code: string; description?: string }) {
    return this.taxService.createHsnCode(body.code, body.description);
  }

  @Get('rates')
  getTaxRates() {
    return this.taxService.getTaxRates();
  }

  @Post('rates')
  createTaxRate(@Body() body: { name: string; cgst: number; sgst: number; igst: number }) {
    return this.taxService.createTaxRate(body.name, body.cgst, body.sgst, body.igst);
  }
}

