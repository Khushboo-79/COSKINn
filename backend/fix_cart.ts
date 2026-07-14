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
  const invalidCartItems = await prisma.cartItem.findMany({
    where: {
      variantId: '<VARIANT_ID>'
    }
  });
  
  if (invalidCartItems.length > 0) {
    console.log(`Found ${invalidCartItems.length} invalid cart items. Deleting...`);
    await prisma.cartItem.deleteMany({
      where: {
        variantId: '<VARIANT_ID>'
      }
    });
    console.log('Deleted invalid cart items.');
  } else {
    console.log('No invalid cart items found with variantId = "<VARIANT_ID>".');
    
    // Check if there are any cart items with variantId not found in db
    const allCartItems = await prisma.cartItem.findMany();
    for (const item of allCartItems) {
      if (item.variantId) {
        const variantExists = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
        if (!variantExists) {
          console.log(`Invalid variantId in cart: ${item.variantId}. Deleting...`);
          await prisma.cartItem.delete({ where: { id: item.id } });
        }
      }
    }
  }
}

run()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
