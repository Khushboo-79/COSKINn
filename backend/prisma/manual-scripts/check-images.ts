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

async function checkImages() {
  // Find all users with carts that have items
  const carts = await prisma.cart.findMany({
    where: {
      items: { some: {} }
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              images: true
            }
          }
        }
      }
    }
  });

  console.log(`\nCarts with items: ${carts.length}`);
  for (const cart of carts) {
    console.log(`\n=== Cart User: ${cart.userId} ===`);
    for (const item of cart.items) {
      console.log(`  Product: ${item.product?.name}`);
      console.log(`  Images count: ${item.product?.images?.length}`);
      for (const img of item.product?.images || []) {
        console.log(`    url=${img.url} | isPrimary=${img.isPrimary}`);
      }
    }
  }
}

checkImages()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
