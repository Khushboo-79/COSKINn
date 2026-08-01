const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log('Total products:', products.length);
  if(products.length > 0) {
    console.log('Sample product status:', products[0].status);
    console.log('Sample product isDeleted:', products[0].isDeleted);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
