import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = [
    { name: 'customer', description: 'Standard e-commerce customer' },
    { name: 'admin', description: 'Super administrator with full access' },
    { name: 'product-manager', description: 'Manages catalog, categories, and products' },
    { name: 'inventory-staff', description: 'Manages warehouse and stock updates' },
    { name: 'order-manager', description: 'Manages order processing and fulfillment' },
    { name: 'warehouse-staff', description: 'Fulfills and packs orders' },
    { name: 'finance', description: 'Views ledgers, settlements, and tax reports' },
    { name: 'hr', description: 'Manages employees and payroll' },
    { name: 'auditor', description: 'Read-only access to audit logs' },
    { name: 'support', description: 'Customer support ticketing and chat' },
    { name: 'marketing', description: 'Manages banners, campaigns, and discounts' },
    { name: 'content', description: 'Manages blog and legal pages' },
  ];

  console.log('Start seeding roles...');
  for (const role of roles) {
    const createdRole = await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
    console.log(`Created or updated role: ${createdRole.name}`);
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
