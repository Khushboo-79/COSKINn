import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  console.log('Seeding Bestsellers...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter, log: ['error'] });

  // Get some cosmetics products
  const cosmetics = await prisma.product.findMany({
    where: { productLine: 'MAKEUP', status: 'LIVE' },
    take: 4
  });
  
  for (const product of cosmetics) {
    await prisma.product.update({
      where: { id: product.id },
      data: { isBestseller: true }
    });
  }
  
  // Get some skincare products
  const skincare = await prisma.product.findMany({
    where: { productLine: 'SKINCARE', status: 'LIVE' },
    take: 4
  });
  
  for (const product of skincare) {
    await prisma.product.update({
      where: { id: product.id },
      data: { isBestseller: true }
    });
  }

  console.log('Successfully set some products as bestsellers!');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
