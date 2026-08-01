import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  const allCartItems = await prisma.cartItem.findMany();
  console.log(`Found ${allCartItems.length} cart items.`);
  for (const item of allCartItems) {
    let variant: any = null;
    if (item.variantId) {
      variant = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
    } else {
      variant = await prisma.productVariant.findFirst({ where: { productId: item.productId } });
    }
    console.log(`Cart Item: ${item.id}, variantId: ${item.variantId}, productId: ${item.productId}, variantFound: ${!!variant}, variantSKU: ${variant?.sku}`);
  }
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
