const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const res = await prisma.purchaseOrder.create({
      data: {
        warehouseId: 'default-warehouse',
        supplierId: 'VEND-002000',
        status: 'ISSUED',
        items: {
          create: [{
            sku: 'sku-123',
            requestedQty: 10,
            unitPrice: 1000
          }]
        }
      }
    });
    console.dir(res);
  } catch (e) {
    console.error(e.message);
  }
}
main().finally(() => prisma.$disconnect());
