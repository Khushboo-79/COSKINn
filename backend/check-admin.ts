import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.findUnique({where: {email: 'admin@coskinn.com'}});
  console.log(admin ? `Found: ${admin.email}, pass: ${admin.passwordHash}` : 'Not found');
}
main().finally(() => prisma.$disconnect());
