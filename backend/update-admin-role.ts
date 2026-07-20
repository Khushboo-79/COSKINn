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

async function main() {
  await prisma.role.update({
    where: { name: 'SUPER_ADMIN' },
    data: { panelAccess: ['admin'] }
  });
  console.log('Updated SUPER_ADMIN panelAccess');
}
main().finally(() => prisma.$disconnect());
