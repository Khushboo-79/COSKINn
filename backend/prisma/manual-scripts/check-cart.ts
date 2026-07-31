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

async function checkCart() {
  const carts = await prisma.cart.findMany({
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  console.log(`Total Carts in DB: ${carts.length}`);
  for (const cart of carts) {
    console.log(`Cart ID: ${cart.id} | User ID: ${cart.userId} | Item count: ${cart.items.length}`);
    for (const item of cart.items) {
      console.log(`  - Item: ${item.product?.name} (${item.productId}) | VariantId: ${item.variantId} | Qty: ${item.quantity}`);
    }
  }

  const coupons = await prisma.coupon.findMany();
  console.log(`Total Coupons in DB: ${coupons.length}`);
  for (const c of coupons) {
    console.log(`  - Coupon: ${c.code} | Active: ${c.isActive} | MinPurchase: ${c.minPurchase} | Used: ${c.usedCount}/${c.usageLimit}`);
  }
}

checkCart()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
