import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ServiceabilityCheckDto, CreateShipmentDto } from './dto/shipping.dto';
import { OrderService } from '../order/order.service';

@Injectable()
export class ShippingService {
  constructor(
    private prisma: PrismaService,
    private orderService: OrderService
  ) {}

  async checkServiceability(dto: ServiceabilityCheckDto) {
    // Mock ShadowFox API call
    const isServiceable = !dto.pincode.startsWith('999'); // e.g., 999xxx is unserviceable
    const estimatedDays = isServiceable ? Math.floor(Math.random() * 5) + 2 : null;
    const shippingFee = isServiceable ? 50 : null;

    return {
      pincode: dto.pincode,
      serviceable: isServiceable,
      estimatedDeliveryDays: estimatedDays,
      shippingFee,
      provider: 'ShadowFox'
    };
  }

  async createShipment(dto: CreateShipmentDto, adminId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: { address: true }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.status === 'SHIPPED' || order.status === 'DELIVERED') {
      throw new BadRequestException('Order is already shipped or delivered');
    }

    // Mock ShadowFox AWB Generation
    const awb = `SFX${Math.floor(Math.random() * 1000000000)}`;
    const labelUrl = `https://shadowfox.com/labels/${awb}.pdf`;
    
    // Create OrderShipment record
    await this.prisma.orderShipment.create({
      data: {
        orderId: dto.orderId,
        awbNumber: awb,
        courierPartner: 'ShadowFox',
        status: 'MANIFESTED',
        shippedAt: new Date()
      }
    });

    // Update order status to SHIPPED
    await this.orderService.updateOrderStatus(
      dto.orderId,
      'SHIPPED',
      adminId,
      `Order shipped via ShadowFox. AWB: ${awb}`
    );

    return {
      success: true,
      orderId: dto.orderId,
      awb,
      labelUrl
    };
  }

  async getOrderShipments(orderId: string) {
    return this.prisma.orderShipment.findMany({
      where: { orderId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
