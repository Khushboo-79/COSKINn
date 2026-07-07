const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  const users = await p.user.findMany({
    include: { roles: { include: { role: true } } }
  });
  
  console.log('=== Users in database ===');
  for (const u of users) {
    console.log(`Email: ${u.email}, Roles: ${u.roles.map(r => r.role.name).join(', ')}`);
  }

  if (users.length === 0) {
    console.log('No users found! Creating admin user...');
  }

  await p.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
