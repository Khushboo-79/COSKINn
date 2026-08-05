require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

async function main() {
  const adminEmail = 'admin@coskinn.com';
  const superAdminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });

  if (superAdminRole) {
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      const admin = await prisma.user.create({
        data: {
          email: adminEmail,
          phone: '+919000000000',
          firstName: 'Coskinn',
          lastName: 'Admin',
          passwordHash,
          roles: {
            create: {
              roleId: superAdminRole.id
            }
          }
        }
      });
      console.log('Created admin@coskinn.com');
    } else {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await prisma.user.update({
        where: { email: adminEmail },
        data: { passwordHash }
      });
      console.log('Updated password for admin@coskinn.com to admin123');
    }
  } else {
    console.log('SUPER_ADMIN role not found');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
