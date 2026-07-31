import { PrismaClient, PlatformType } from '@prisma/client';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Soft-deleting existing categories...');
  await prisma.category.updateMany({
    data: { isDeleted: true },
  });

  console.log('Seeding Cosmetics Categories...');
  const cosmetics = [
    'FACE',
    'EYES',
    'LIPS',
    'NAILS',
    'TOOLS & BRUSHES',
    'PALETTES',
    'FRAGRANCE',
    'KITS & COMBOS',
    'GIFTS & ACCESSORIES',
  ];
  for (const name of cosmetics) {
    await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
        platform: PlatformType.COSMETICS,
      },
    });
  }

  console.log('Seeding Skincare Categories...');
  const skincare = [
    'Sunscreen',
    'Toner',
    'Serum',
    'Moisturizer',
    'Cleanser',
    'Combos & Kits',
  ];
  for (const name of skincare) {
    await prisma.category.create({
      data: {
        name,
        slug: name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and'),
        platform: PlatformType.SKINCARE,
      },
    });
  }

  console.log('Categories seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
