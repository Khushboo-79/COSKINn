import { Controller, Get, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get('active')
  getActiveOffers() {
    return this.offerService.getTieredOfferProgress(0); // Pass 0 to just get all tiers without evaluating achieved
  }
}
