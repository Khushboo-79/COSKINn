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

async function backfillVariants() {
  console.log('Starting backfill for missing product variants...');
  
  const products = await prisma.product.findMany({
    include: {
      variants: true
    }
  });

  console.log(`Total products checked: ${products.length}`);
  let createdCount = 0;

  for (const product of products) {
    if (!product.variants || product.variants.length === 0) {
      const defaultSku = `SKU-${product.id.slice(0, 8).toUpperCase()}-DEF`;
      const baseMrp = Number(product.mrp || product.discountPrice || 499);
      const basePrice = Number(product.discountPrice || product.mrp || 399);

      try {
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku: defaultSku,
            name: 'Standard',
            mrp: baseMrp,
            price: basePrice
          }
        });
        createdCount++;
        console.log(`Created default variant [${defaultSku}] for product: ${product.name}`);
      } catch (err: any) {
        // If SKU already exists, generate a unique one
        const fallbackSku = `SKU-${product.id.slice(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
        await prisma.productVariant.create({
          data: {
            productId: product.id,
            sku: fallbackSku,
            name: 'Standard',
            mrp: baseMrp,
            price: basePrice
          }
        });
        createdCount++;
        console.log(`Created fallback variant [${fallbackSku}] for product: ${product.name}`);
      }
    }
  }

  console.log(`Backfill complete. Created ${createdCount} default ProductVariant records.`);
}

backfillVariants()
  .catch((e) => {
    console.error('Backfill error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
