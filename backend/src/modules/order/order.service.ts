import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrderFromCart(userId: string, addressId: string, paymentMode: string) {
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

    const discountAmt = totalAmount - finalAmount;

    // 3. Create the order using a transaction
    return this.prisma.$transaction(async (tx) => {
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
              
              if (!variantId) {
                const firstVariant = await tx.productVariant.findFirst({
                  where: { productId: item.productId }
                });
                if (firstVariant) {
                  variantId = firstVariant.id;
                  sku = firstVariant.sku;
                }
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

      return order;
    });
  }
}
