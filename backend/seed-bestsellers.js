const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  
  const products = await prisma.product.findMany({ take: 4 });
  for (const p of products) {
    await prisma.product.update({
      where: { id: p.id },
      data: { isBestseller: true }
    });
    console.log(`Set isBestseller=true for product: ${p.name}`);
  }
}

main().catch(console.error).finally(() => process.exit(0));
