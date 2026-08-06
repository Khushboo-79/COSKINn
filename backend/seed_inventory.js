const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding inventory...');
  
  // Create a default warehouse if none exists
  let warehouse = await prisma.warehouse.findFirst({
    where: { code: 'WH-MAIN' }
  });

  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
      data: {
        name: 'Main Warehouse',
        code: 'WH-MAIN',
        address: '123 Main St',
        isActive: true
      }
    });
    console.log('Created Main Warehouse');
  }

  // Get all product variants
  const variants = await prisma.productVariant.findMany();
  console.log(`Found ${variants.length} variants`);

  // Seed inventory for each
  for (const variant of variants) {
    const existing = await prisma.inventoryStock.findUnique({
      where: {
        warehouseId_sku: {
          warehouseId: warehouse.id,
          sku: variant.sku
        }
      }
    });

    if (existing) {
      await prisma.inventoryStock.update({
        where: { id: existing.id },
        data: { quantity: 1000 }
      });
    } else {
      await prisma.inventoryStock.create({
        data: {
          warehouseId: warehouse.id,
          sku: variant.sku,
          quantity: 1000
        }
      });
    }
  }

  console.log('Successfully seeded 1000 stock for all SKUs!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
