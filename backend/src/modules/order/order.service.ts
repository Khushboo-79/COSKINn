import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InventoryService } from '../inventory/inventory.service';
import { RewardPointService } from '../reward-point/reward-point.service';
import { BonusService } from '../bonus/bonus.service';
import { ReferralService } from '../referral/referral.service';
import { OfferService } from '../offer/offer.service';

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private inventoryService: InventoryService,
    private rewardPointService: RewardPointService,
    private bonusService: BonusService,
    private referralService: ReferralService,
    private offerService: OfferService
  ) {}

  async createOrderFromCart(userId: string, addressId: string, paymentMode: string, pointsToRedeem: number = 0) {
    // 1. Fetch the user's cart and address
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const address = await this.prisma.customerAddress.findUnique({
      where: { id: addressId, userId }
    });

    if (!address) {
      throw new NotFoundException('Delivery address not found');
    }

    // 2. Calculate totals
    let totalAmount = 0; // MRP sum
    let finalAmount = 0; // Discounted sum
    let taxAmount = 0; // Placeholder for now
    let shippingFee = 0; // Placeholder for now

    cart.items.forEach(item => {
      const mrp = Number(item.product.mrp);
      const discountPrice = Number(item.product.discountPrice || mrp);
      
      totalAmount += (mrp * item.quantity);
      finalAmount += (discountPrice * item.quantity);
    });

    const offerData = await this.offerService.evaluateBestOffer(cart.items, finalAmount);
    
    // Deduct offer discount
    finalAmount -= offerData.discount;
    if (finalAmount < 0) finalAmount = 0;

    const discountAmt = totalAmount - finalAmount;

    // Validate points redemption
    if (pointsToRedeem > 0) {
      const balance = await this.rewardPointService.getBalance(userId);
      if (balance < pointsToRedeem) {
        throw new BadRequestException('Insufficient reward points');
      }
      // e.g. 1 point = 1 rupee discount
      finalAmount -= pointsToRedeem;
      if (finalAmount < 0) finalAmount = 0;
    }

    // 3. Create the order using a transaction
    const orderData = await this.prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId,
          status: paymentMode === 'ONLINE' ? 'DRAFT' : 'PLACED',
          totalAmount,
          discountAmt,
          taxAmount,
          shippingFee,
          finalAmount,
          paymentMode,
          
          // Create the order address snapshot
          address: {
            create: {
              sourceAddressId: address.id,
              fullName: address.fullName,
              phone: address.phone,
              addressLine1: address.addressLine1,
              addressLine2: address.addressLine2,
              city: address.city,
              state: address.state,
              pincode: address.pincode,
              country: address.country
            }
          },

          // Create the order items
          items: {
            create: await Promise.all(cart.items.map(async (item) => {
              const mrp = Number(item.product.mrp);
              const discountPrice = Number(item.product.discountPrice || mrp);
              let variantId = item.variantId;
              let sku = 'UNKNOWN_SKU';
              
              let variant: any = null;
              if (variantId) {
                variant = await tx.productVariant.findUnique({ where: { id: variantId } });
              } else {
                variant = await tx.productVariant.findFirst({ where: { productId: item.productId } });
              }

              if (variant) {
                variantId = variant.id;
                sku = variant.sku;
              }

              return {
                variantId: variantId as string, // Cast to string assuming we found one, otherwise it'll throw a db error
                sku: sku,
                name: item.product.name,
                quantity: item.quantity,
                price: discountPrice,
                total: discountPrice * item.quantity,
                taxAmount: 0
              };
            }))
          }
        },
        include: {
          address: true,
          items: true
        }
      });

      // 4. Clear the cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      // 5. Reserve stock for all items
      for (const item of order.items) {
        await this.inventoryService.reserveStock(item.sku, item.quantity, tx);
      }

      return order;
    });

    if (pointsToRedeem > 0) {
      await this.rewardPointService.redeemPoints(userId, pointsToRedeem, orderData.id);
    }

    return orderData;
  }

  // --- ADMIN METHODS ---

  async getAdminOrders(filters: { status?: string, paymentMode?: string, email?: string, mobile?: string }) {
    const where: any = {};
    
    if (filters.status) where.status = filters.status;
    if (filters.paymentMode) where.paymentMode = filters.paymentMode;
    if (filters.email || filters.mobile) {
      where.user = {};
      if (filters.email) where.user.email = { contains: filters.email, mode: 'insensitive' };
      if (filters.mobile) where.user.phone = { contains: filters.mobile };
    }

    return this.prisma.order.findMany({
      where,
      include: {
        address: true,
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        items: { include: { variant: { include: { product: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getAdminOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        address: true,
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        items: { include: { variant: { include: { product: true } } } },
        payments: true,
        shipments: true,
        cancellations: true,
        statusHistory: { orderBy: { createdAt: 'desc' } }
      }
    });

    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async updateOrderStatus(orderId: string, status: string, adminId: string, notes?: string) {
    const order = await this.prisma.order.findUnique({ 
      where: { id: orderId },
      include: { items: true }
    });
    if (!order) throw new NotFoundException('Order not found');

    const res = await this.prisma.$transaction(async (tx) => {
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status }
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          status,
          notes: notes || `Status updated by Admin ${adminId}`
        }
      });

      // If status changes to SHIPPED, deduct reserved stock
      if (status === 'SHIPPED' && order.status !== 'SHIPPED' && order.status !== 'DELIVERED') {
        for (const item of order.items) {
          await this.inventoryService.deductReservedStock(item.sku, item.quantity, tx);
        }
      }

      return updatedOrder;
    });

    // Post-transaction triggers for DELIVERED
    if (status === 'DELIVERED' && order.status !== 'DELIVERED') {
      try {
        await this.rewardPointService.earnPoints(order.userId, order.totalAmount, orderId);
        await this.bonusService.awardFirstOrderBonus(order.userId);
        
        // Check if user was referred, and award bonus if this is their first order?
        // For simplicity, we can trigger referral bonus on first delivered order
        const referral = await this.prisma.referral.findUnique({
          where: { refereeId: order.userId }
        });
        if (referral && !referral.bonusAwarded) {
          await this.referralService.awardReferralBonus(referral.id);
        }
      } catch (error) {
        // Log but don't fail the order status update
        console.error('Error awarding bonuses on delivery:', error);
      }
    }

    return res;
  }

  async adminCancelOrder(orderId: string, adminId: string, reason: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) throw new NotFoundException('Order not found');

    if (order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      throw new BadRequestException(`Cannot cancel order in ${order.status} state`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Mark as cancelled
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' }
      });

      // 2. Add history and cancellation record
      await tx.orderStatusHistory.create({
        data: { orderId, status: 'CANCELLED', notes: `Cancelled by Admin ${adminId}: ${reason}` }
      });

      await tx.orderCancellation.create({
        data: { orderId, reason }
      });

      // 3. Release reserved stock if it was PACKED or PLACED
      if (order.status === 'PACKED' || order.status === 'PLACED') {
        for (const item of order.items) {
          await this.inventoryService.releaseReservedStock(item.sku, item.quantity, tx);
        }
      }

      return updatedOrder;
    });
  }

  async cancelOrder(orderId: string, userId: string, reason: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true }
    });

    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) throw new BadRequestException('Not authorized to cancel this order');

    if (order.status === 'SHIPPED' || order.status === 'DELIVERED' || order.status === 'CANCELLED') {
      throw new BadRequestException(`Cannot cancel order in ${order.status} state`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Mark as cancelled
      const updatedOrder = await tx.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED' }
      });

      // 2. Add history and cancellation record
      await tx.orderStatusHistory.create({
        data: { orderId, status: 'CANCELLED', notes: `Cancelled by user: ${reason}` }
      });

      await tx.orderCancellation.create({
        data: { orderId, reason }
      });

      // 3. Release reserved stock
      for (const item of order.items) {
        await this.inventoryService.releaseReservedStock(item.sku, item.quantity, tx);
      }

      // 4. (Optional) Trigger refund if payment was online & successful
      // In a real system, we'd hit PaymentService/RefundService here

      return updatedOrder;
    });
  }

  // --- SETTINGS METHODS ---

  async getSettings() {
    let settings = await this.prisma.orderSettings.findFirst();
    if (!settings) {
      settings = await this.prisma.orderSettings.create({
        data: {
          returnWindowDays: 7,
          autoCancelHours: 24,
          codEnabled: true,
          maxCodAmount: 5000
        }
      });
    }
    return settings;
  }

  async getCancellations() {
    const cancellations = await this.prisma.orderCancellation.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        order: {
          select: {
            id: true,
            totalAmount: true,
            status: true,
            user: { select: { email: true } }
          }
        }
      }
    });

    return cancellations.map(c => ({
      id: c.id,
      date: c.createdAt.toISOString().split('T')[0],
      orderId: c.orderId.split('-')[0].toUpperCase(),
      customer: c.order.user ? c.order.user.email : 'Guest',
      reason: c.reason,
      refundStatus: c.order.status === 'CANCELLED' ? 'PROCESSED' : 'PENDING'
    }));
  }

  async updateSettings(data: {
    returnWindowDays?: number;
    autoCancelHours?: number;
    codEnabled?: boolean;
    maxCodAmount?: number;
  }) {
    const settings = await this.getSettings();
    return this.prisma.orderSettings.update({
      where: { id: settings.id },
      data
    });
  }
}
