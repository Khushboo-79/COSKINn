process.env.DATABASE_URL = 'postgresql://postgres:password@localhost:5432/postgres?schema=public';

const { PrismaClient } = require('./node_modules/.prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const p = new PrismaClient({ adapter });

async function main() {
  const users = await p.user.findMany({
    include: { roles: { include: { role: true } } }
  });

  console.log('=== Existing Users ===');
  if (users.length === 0) {
    console.log('  (none)');
  }
  for (const u of users) {
    console.log(`  Email: ${u.email}, Roles: [${u.roles.map(r => r.role.name).join(', ')}]`);
  }

  let adminRole = await p.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
  if (!adminRole) {
    console.log('\nCreating SUPER_ADMIN role...');
    adminRole = await p.role.create({ data: { name: 'SUPER_ADMIN', description: 'Full system access' } });
  }

  let marketingRole = await p.role.findUnique({ where: { name: 'MARKETING_MANAGER' } });
  if (!marketingRole) {
    console.log('Creating MARKETING_MANAGER role...');
    marketingRole = await p.role.create({ data: { name: 'MARKETING_MANAGER', description: 'Marketing panel access' } });
  }

  const adminUser = await p.user.findUnique({ where: { email: 'admin@coskinn.com' } });
  if (!adminUser) {
    console.log('\nCreating admin@coskinn.com user...');
    const hash = await bcrypt.hash('admin123', 10);
    const newUser = await p.user.create({
      data: {
        email: 'admin@coskinn.com',
        passwordHash: hash,
        firstName: 'Admin',
        lastName: 'COSKINn',
        roles: {
          create: [
            { roleId: adminRole.id },
            { roleId: marketingRole.id }
          ]
        }
      }
    });
    console.log(`Created user: ${newUser.email} with SUPER_ADMIN + MARKETING_MANAGER roles`);
  } else {
    const existingRoles = await p.userRole.findMany({ where: { userId: adminUser.id } });
    const roleIds = existingRoles.map(r => r.roleId);

    if (!roleIds.includes(adminRole.id)) {
      await p.userRole.create({ data: { userId: adminUser.id, roleId: adminRole.id } });
      console.log('Added SUPER_ADMIN role to admin user');
    }
    if (!roleIds.includes(marketingRole.id)) {
      await p.userRole.create({ data: { userId: adminUser.id, roleId: marketingRole.id } });
      console.log('Added MARKETING_MANAGER role to admin user');
    }
    console.log(`\nadmin@coskinn.com already exists and has the correct roles.`);
  }

  console.log('\n=== Login Credentials ===');
  console.log('Email: admin@coskinn.com');
  console.log('Password: admin123');

  await p.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
