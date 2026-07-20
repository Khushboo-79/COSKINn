import { Controller, Get, Query, Req, BadRequestException } from '@nestjs/common';
import { LocationService } from './location.service';
import type { Request } from 'express';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('ip')
  getIpLocation(@Req() req: Request) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // x-forwarded-for can be a comma separated list if multiple proxies exist
    const clientIp = Array.isArray(ip) ? ip[0] : (typeof ip === 'string' ? ip.split(',')[0] : ip);

    return this.locationService.getIpLocation(clientIp || '');
  }

  @Get('reverse-geocode')
  async reverseGeocode(@Query('lat') lat: string, @Query('lng') lng: string) {
    if (!lat || !lng) {
      throw new BadRequestException('lat and lng are required parameters');
    }

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if (isNaN(latitude) || isNaN(longitude)) {
      throw new BadRequestException('lat and lng must be valid numbers');
    }

    return this.locationService.reverseGeocode(latitude, longitude);
  }
}
