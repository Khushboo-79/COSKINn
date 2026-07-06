import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, search?: string, status?: string) {
    const skip = (page - 1) * limit;
    const where: any = { isDeleted: false };
    
    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { id: { contains: search } },
        { user: { email: { contains: search } } },
        { user: { phone: { contains: search } } },
      ];
    }

    return this.prisma.order.findMany({
      where,
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
        items: true,
        address: true,
        statusHistory: { orderBy: { createdAt: 'desc' } },
        payments: { orderBy: { createdAt: 'desc' } },
        shipments: { orderBy: { createdAt: 'desc' } },
        invoices: { orderBy: { createdAt: 'desc' } },
        cancellations: { orderBy: { createdAt: 'desc' } },
      }
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return this.prisma.$transaction(async (prisma) => {
      // Create the ledger entry
      await prisma.orderStatusHistory.create({
        data: {
          orderId: id,
          status: dto.status,
          notes: dto.notes,
        },
      });

      // Update the main order record
      return prisma.order.update({
        where: { id },
        data: { status: dto.status },
        include: {
          statusHistory: { orderBy: { createdAt: 'desc' } }
        }
      });
    });
  }

  async cancelOrder(id: string, reason: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Only allow cancellation if not shipped yet
    if (['SHIPPED', 'DELIVERED', 'CANCELLED'].includes(order.status)) {
      throw new Error(`Order cannot be cancelled in status: ${order.status}`);
    }

    return this.prisma.$transaction(async (prisma) => {
      // Create cancellation record
      await prisma.orderCancellation.create({
        data: {
          orderId: id,
          reason,
        }
      });

      // Create ledger entry
      await prisma.orderStatusHistory.create({
        data: {
          orderId: id,
          status: 'CANCELLED',
          notes: `Cancelled: ${reason}`,
        },
      });

      // Update main order
      return prisma.order.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
    });
  }

  async getInvoice(id: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // For now, return a mock invoice payload. In production, this will generate or fetch a PDF.
    return {
      orderId: id,
      invoiceNumber: `INV-${id.split('-')[0].toUpperCase()}`,
      pdfUrl: null,
      mockHtml: `<h1>Invoice for Order #${id.split('-')[0].toUpperCase()}</h1><p>Amount: ₹${order.finalAmount}</p>`
    };
  }

  async checkout(userId: string, dto: CreateOrderDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    const address = await this.prisma.customerAddress.findUnique({
      where: { id: dto.customerAddressId }
    });

    if (!address) {
      throw new Error('Customer address not found');
    }

    // Fetch variants separately
    const variantIds = cart.items.map(i => i.variantId).filter(Boolean) as string[];
    const variants = await this.prisma.productVariant.findMany({
      where: { id: { in: variantIds } }
    });
    const variantMap = new Map(variants.map(v => [v.id, v]));

    let subtotal = 0;
    const orderItemsData = cart.items.map(item => {
      const variant = item.variantId ? variantMap.get(item.variantId) : null;
      if (!variant) throw new Error(`Product Variant missing for cart item: ${item.id}`);

      const price = variant.price;
      const total = price * item.quantity;
      subtotal += total;

      return {
        variantId: variant.id,
        sku: variant.sku,
        name: `${item.product.name} - ${variant.name}`,
        quantity: item.quantity,
        price: price,
        taxAmount: total * 0.18, // Mock 18% tax
        total: total,
      };
    });

    const taxAmount = subtotal * 0.18;
    const shippingFee = subtotal > 500 ? 0 : 50; // Free shipping over 500
    const finalAmount = subtotal + taxAmount + shippingFee;

    return this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.create({
        data: {
          userId,
          status: 'PLACED',
          totalAmount: subtotal,
          taxAmount,
          shippingFee,
          finalAmount,
          paymentMode: dto.paymentMode,
          items: {
            create: orderItemsData
          },
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
          statusHistory: {
            create: {
              status: 'PLACED',
              notes: 'Order placed successfully'
            }
          }
        }
      });

      // Clear the cart
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id }
      });

      return order;
    });
  }
}
