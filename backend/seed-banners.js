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
  console.log('Seeding dummy banners...');

  await prisma.banner.createMany({
    data: [
      {
        title: 'Summer Skincare Sale',
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80', 
        linkUrl: '/collections/skincare',
        position: 'hero'
      },
      {
        title: 'New Arrivals: Precision Lip Liners',
        imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        linkUrl: '/collections/new-arrivals',
        position: 'hero'
      },
      {
        title: 'Award Winning Cosmetics',
        imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477eb317dd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
        linkUrl: '/collections/award-winners',
        position: 'hero'
      }
    ]
  });

  console.log('Banners seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
