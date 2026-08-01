const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

async function seed() {
  await prisma.offerRule.deleteMany({});
  await prisma.offer.deleteMany({});

  const offer1 = await prisma.offer.create({
    data: {
      title: 'FLAT 15%',
      discountPct: 15,
      isActive: true,
      rules: {
        create: [
          { ruleType: 'MIN_CART_VALUE', ruleValue: '500' }
        ]
      }
    }
  });

  const offer2 = await prisma.offer.create({
    data: {
      title: 'Free Gift',
      description: 'Get a free gift with your purchase',
      isActive: true,
      rules: {
        create: [
          { ruleType: 'MIN_CART_VALUE', ruleValue: '1208' }
        ]
      }
    }
  });

  const offer3 = await prisma.offer.create({
    data: {
      title: 'Flat 20% OFF + 2 gifts',
      discountPct: 20,
      isActive: true,
      rules: {
        create: [
          { ruleType: 'MIN_CART_VALUE', ruleValue: '2500' }
        ]
      }
    }
  });

  console.log('Offers seeded successfully!');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
