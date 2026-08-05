const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany({
    select: { id: true, status: true }
  });
  console.dir(orders);
}
main().finally(() => prisma.$disconnect());
