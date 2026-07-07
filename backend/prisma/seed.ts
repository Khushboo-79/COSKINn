import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

async function main() {
  console.log('Seeding database...');

  // 1. Create Default Roles
  const roles = [
    'SUPER_ADMIN',
    'PRODUCT_MANAGER',
    'AUDITOR',
    'FINANCE_MANAGER',
    'INVENTORY_MANAGER',
    'ORDER_MANAGER',
    'WAREHOUSE_MANAGER',
    'SUPPORT_AGENT',
    'MARKETING_MANAGER',
    'CONTENT_MANAGER',
    'HR_MANAGER'
  ];

  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, description: `${roleName} role` },
    });
  }
  console.log('Roles created or already exist.');

  // 2. Create Super Admin User
  const adminEmail = 'admin@coskinn.com';
  const superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });

  if (superAdminRole) {
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          firstName: 'Super',
          lastName: 'Admin',
          passwordHash,
          roles: {
            create: {
              roleId: superAdminRole.id
            }
          }
        }
      });
      console.log('Super Admin user created:', admin.email);
    } else {
      console.log('Super Admin user already exists:', existingAdmin.email);
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
