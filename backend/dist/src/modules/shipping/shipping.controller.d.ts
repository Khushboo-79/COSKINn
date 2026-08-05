import { ShippingService } from './shipping.service';
import { ServiceabilityCheckDto, CreateShipmentDto } from './dto/shipping.dto';
export declare class ShippingController {
    private readonly shippingService;
    constructor(shippingService: ShippingService);
    checkServiceability(dto: ServiceabilityCheckDto): Promise<{
        pincode: string;
        serviceable: boolean;
        estimatedDeliveryDays: number | null;
        shippingFee: number | null;
        provider: string;
    }>;
    createShipment(dto: CreateShipmentDto, req: any): Promise<{
        success: boolean;
        orderId: string;
        awb: string;
        labelUrl: string;
    }>;
    getOrderShipments(orderId: string): Promise<{
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        awbNumber: string | null;
        courierPartner: string | null;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    }[]>;
    getAllShipments(): Promise<({
        order: {
            address: {
                id: string;
                createdAt: Date;
                orderId: string;
                phone: string;
                fullName: string;
                addressLine1: string;
                addressLine2: string | null;
                city: string;
                state: string;
                pincode: string;
                country: string;
                sourceAddressId: string | null;
            } | null;
        } & {
            status: string;
            id: string;
            isDeleted: boolean;
            deletedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
            platform: import("@prisma/client").$Enums.PlatformType;
            userId: string;
            totalAmount: number;
            discountAmt: number;
            taxAmount: number;
            shippingFee: number;
            finalAmount: number;
            paymentMode: string;
            couponId: string | null;
        };
    } & {
        status: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        orderId: string;
        awbNumber: string | null;
        courierPartner: string | null;
        shippedAt: Date | null;
        deliveredAt: Date | null;
    })[]>;
}
