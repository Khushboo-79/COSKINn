import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as geoip from 'geoip-lite';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  // 1. IP Geolocation
  getIpLocation(ip: string) {
    // Handling localhost/development IPs
    if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
      return {
        ip,
        isLocalhost: true,
        country: 'IN', // Mocking India for local testing
        city: 'Mumbai',
        message: 'Localhost detected, returning mock data.'
      };
    }

    const geo = geoip.lookup(ip);
    
    if (!geo) {
      return { ip, error: 'Location not found for this IP' };
    }

    return {
      ip,
      country: geo.country,
      region: geo.region,
      city: geo.city,
      ll: geo.ll, // [latitude, longitude]
      timezone: geo.timezone,
    };
  }

  // 2. Reverse Geocoding (Lat/Lng -> Address + Serviceability)
  async reverseGeocode(lat: number, lng: number) {
    try {
      // Nominatim requires a user-agent header
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      
      const { data } = await firstValueFrom(
        this.httpService.get<any>(url, {
          headers: {
            'User-Agent': 'COSKINn-App/1.0',
            'Accept-Language': 'en-US,en;q=0.9',
          }
        })
      );

      if (!data || data.error) {
        return { error: 'Could not resolve address' };
      }

      const address = data.address || {};
      const pincode = address.postcode;

      let serviceability: any = null;
      if (pincode) {
        serviceability = await this.prisma.serviceablePincode.findUnique({
          where: { pincode }
        });
      }

      return {
        formattedAddress: data.display_name,
        city: address.city || address.town || address.village,
        state: address.state,
        country: address.country,
        pincode: pincode,
        isServiceable: serviceability ? serviceability.isActive : false,
        isCodAvailable: serviceability ? serviceability.isCod : false,
      };
    } catch (error) {
      this.logger.error(`Geocoding error for lat:${lat}, lng:${lng}`, error);
      return { error: 'Geocoding service unavailable' };
    }
  }
}
