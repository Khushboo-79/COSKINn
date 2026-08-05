import { LocationService } from './location.service';
import type { Request } from 'express';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    getIpLocation(req: Request): {
        ip: string;
        isLocalhost: boolean;
        country: string;
        city: string;
        message: string;
        error?: undefined;
        region?: undefined;
        ll?: undefined;
        timezone?: undefined;
    } | {
        ip: string;
        error: string;
        isLocalhost?: undefined;
        country?: undefined;
        city?: undefined;
        message?: undefined;
        region?: undefined;
        ll?: undefined;
        timezone?: undefined;
    } | {
        ip: string;
        country: string;
        region: string;
        city: string;
        ll: [number, number];
        timezone: string;
        isLocalhost?: undefined;
        message?: undefined;
        error?: undefined;
    };
    reverseGeocode(lat: string, lng: string): Promise<{
        error: string;
        formattedAddress?: undefined;
        city?: undefined;
        state?: undefined;
        country?: undefined;
        pincode?: undefined;
        isServiceable?: undefined;
        isCodAvailable?: undefined;
    } | {
        formattedAddress: any;
        city: any;
        state: any;
        country: any;
        pincode: any;
        isServiceable: any;
        isCodAvailable: any;
        error?: undefined;
    }>;
}
