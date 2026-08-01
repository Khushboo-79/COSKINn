import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

async function backfillInventory() {
  console.log('Starting Inventory backfill for all ProductVariants...');

  // 1. Ensure a default warehouse exists
  let warehouse = await prisma.warehouse.findFirst({
    where: { code: 'WH-MAIN' }
  });

  if (!warehouse) {
    warehouse = await prisma.warehouse.create({
      data: {
        code: 'WH-MAIN',
        name: 'COSKINn Central Warehouse',
        address: '100 Luxury Avenue, Mumbai, India',
        isActive: true
      }
    });
    console.log(`Created default warehouse: WH-MAIN (${warehouse.id})`);
  } else {
    console.log(`Found existing warehouse: WH-MAIN (${warehouse.id})`);
  }

  // 2. Get all ProductVariant records
  const variants = await prisma.productVariant.findMany();
  console.log(`Found ${variants.length} ProductVariant records.`);

  let createdCount = 0;
  let updatedCount = 0;

  for (const variant of variants) {
    const existing = await prisma.inventoryStock.findUnique({
      where: {
        warehouseId_sku: {
          warehouseId: warehouse.id,
          sku: variant.sku
        }
      }
    });

    if (!existing) {
      await prisma.inventoryStock.create({
        data: {
          warehouseId: warehouse.id,
          sku: variant.sku,
          quantity: 10000,
          reservedQty: 0
        }
      });
      createdCount++;
    } else if (existing.quantity < 100) {
      await prisma.inventoryStock.update({
        where: { id: existing.id },
        data: {
          quantity: 10000
        }
      });
      updatedCount++;
    }
  }

  console.log(`Inventory Backfill complete! Added stock for ${createdCount} SKUs, updated ${updatedCount} SKUs.`);
}

backfillInventory()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
