require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcrypt');

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const p = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Staff Users...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // Ensure Roles exist
  let hrRole = await p.role.findUnique({ where: { name: 'HR Manager' } });
  if (!hrRole) {
    hrRole = await p.role.create({
      data: { name: 'HR Manager', description: 'Access to HR panel', panelAccess: ['hr'] }
    });
    console.log('Created HR Manager Role');
  }

  let inventoryRole = await p.role.findUnique({ where: { name: 'Inventory Manager' } });
  if (!inventoryRole) {
    inventoryRole = await p.role.create({
      data: { name: 'Inventory Manager', description: 'Access to Inventory and Warehouse panels', panelAccess: ['inventory', 'warehouse'] }
    });
    console.log('Created Inventory Manager Role');
  }

  // Create HR User
  let hrUser = await p.user.findUnique({ where: { email: 'hr@coskinn.com' } });
  if (!hrUser) {
    hrUser = await p.user.create({
      data: {
        email: 'hr@coskinn.com',
        firstName: 'Sarah',
        lastName: 'HR',
        phone: '+919999999990',
        passwordHash,
        roles: { create: { roleId: hrRole.id } }
      }
    });
    console.log('Created hr@coskinn.com with HR Manager role');
  } else {
    console.log('hr@coskinn.com already exists');
  }

  // Create Inventory User
  let invUser = await p.user.findUnique({ where: { email: 'inventory@coskinn.com' } });
  if (!invUser) {
    invUser = await p.user.create({
      data: {
        email: 'inventory@coskinn.com',
        firstName: 'John',
        lastName: 'Warehouse',
        phone: '+919999999991',
        passwordHash,
        roles: { create: { roleId: inventoryRole.id } }
      }
    });
    console.log('Created inventory@coskinn.com with Inventory Manager role');
  } else {
    console.log('inventory@coskinn.com already exists');
  }

  console.log('Done seeding staff.');
  await p.$disconnect();
  await pool.end();
}

main().catch(e => { console.error(e); process.exit(1); });
