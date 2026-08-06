const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({ take: 4 });
  for (const p of products) {
    await prisma.product.update({
      where: { id: p.id },
      data: { isBestseller: true }
    });
    console.log('Marked as bestseller:', p.name);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
