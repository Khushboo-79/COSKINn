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

async function checkDb() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      images: true
    }
  });

  console.log(`Found ${products.length} products in DB.`);

  for (const p of products) {
    console.log(`\nProduct: ${p.name}`);
    console.log(`Slug: ${p.slug}`);
    console.log(`Status: ${p.status}`);
    console.log(`IsDeleted: ${p.isDeleted}`);
    console.log(`Category Name: ${p.category?.name}`);
    console.log(`Category Slug: ${p.category?.slug}`);
    console.log(`Images count: ${p.images?.length}`);
    console.log(`Primary Image: ${p.images?.find(img => img.isPrimary)?.url || 'None'}`);
  }
}

checkDb()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
