const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const order = await prisma.order.findFirst({
    where: { status: 'PLACED' },
    include: { items: true }
  });

  if (!order) {
    console.log("No PLACED order found.");
    return;
  }

  console.log(`Found order ${order.id} with ${order.items.length} items`);

  if (order.items.length === 0) {
    // Find some products
    const product = await prisma.product.findFirst({ include: { variants: true } });
    if (!product || product.variants.length === 0) {
      console.log("No products/variants found to add.");
      return;
    }

    const variant = product.variants[0];

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        variantId: variant.id,
        sku: variant.sku,
        name: product.name,
        quantity: 2,
        price: variant.price,
        total: variant.price * 2
      }
    });
    console.log("Added 1 item to the order.");
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
