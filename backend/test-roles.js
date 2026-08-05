const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const roles = await prisma.role.findMany();
  console.log("ROLES IN DB:", JSON.stringify(roles, null, 2));

  // Find a user with SUPER_ADMIN role
  const userRole = await prisma.userRole.findFirst({
    where: { role: { name: 'SUPER_ADMIN' } },
    include: { user: true }
  });

  if (userRole) {
    const token = jwt.sign({ sub: userRole.user.id, email: userRole.user.email, roles: ['SUPER_ADMIN'] }, process.env.JWT_SECRET);
    console.log("Generated Token:", token);
  }
}

main().finally(() => prisma.$disconnect());
