import { OfferService } from './offer.service';
export declare class OfferController {
    private readonly offerService;
    constructor(offerService: OfferService);
    getActiveOffers(): Promise<any[]>;
}
