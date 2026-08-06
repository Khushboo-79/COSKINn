require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding dummy coupon...');

  await prisma.coupon.upsert({
    where: { code: 'WELCOME50' },
    update: {},
    create: {
      code: 'WELCOME50',
      description: '50% off on your first order',
      discountType: 'PERCENTAGE',
      discountValue: 50,
      minPurchase: 500,
      maxDiscount: 1000,
      isActive: true,
      usageLimit: 1000,
      usedCount: 0
    }
  });

  await prisma.coupon.upsert({
    where: { code: 'FLAT200' },
    update: {},
    create: {
      code: 'FLAT200',
      description: 'Flat Rs 200 off',
      discountType: 'FIXED_AMOUNT',
      discountValue: 200,
      minPurchase: 1000,
      isActive: true,
      usageLimit: 1000,
      usedCount: 0
    }
  });

  console.log('Coupons seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
