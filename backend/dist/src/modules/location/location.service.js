"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const geoip = __importStar(require("geoip-lite"));
const prisma_service_1 = require("../../prisma/prisma.service");
let LocationService = LocationService_1 = class LocationService {
    httpService;
    prisma;
    logger = new common_1.Logger(LocationService_1.name);
    constructor(httpService, prisma) {
        this.httpService = httpService;
        this.prisma = prisma;
    }
    getIpLocation(ip) {
        if (ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
            return {
                ip,
                isLocalhost: true,
                country: 'IN',
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
            ll: geo.ll,
            timezone: geo.timezone,
        };
    }
    async reverseGeocode(lat, lng) {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, {
                headers: {
                    'User-Agent': 'Fairenne-App/1.0',
                    'Accept-Language': 'en-US,en;q=0.9',
                }
            }));
            if (!data || data.error) {
                return { error: 'Could not resolve address' };
            }
            const address = data.address || {};
            const pincode = address.postcode;
            let serviceability = null;
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
        }
        catch (error) {
            this.logger.error(`Geocoding error for lat:${lat}, lng:${lng}`, error);
            return { error: 'Geocoding service unavailable' };
        }
    }
};
exports.LocationService = LocationService;
exports.LocationService = LocationService = LocationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], LocationService);
//# sourceMappingURL=location.service.js.map