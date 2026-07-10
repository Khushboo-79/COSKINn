import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaxService {
  constructor(private prisma: PrismaService) {}

  // --- HSN Codes ---
  async getHsnCodes() {
    return this.prisma.hsnCode.findMany();
  }

  async createHsnCode(code: string, description?: string) {
    return this.prisma.hsnCode.create({
      data: { code, description }
    });
  }

  // --- Tax Rates ---
  async getTaxRates() {
    return this.prisma.taxRate.findMany();
  }

  async createTaxRate(name: string, cgst: number, sgst: number, igst: number) {
    return this.prisma.taxRate.create({
      data: { name, cgst, sgst, igst }
    });
  }
}
