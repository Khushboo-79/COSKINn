const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  console.log('Total products:', products.length);
  if (products.length > 0) {
    console.log('Sample product:', JSON.stringify(products[0], null, 2));
  } else {
    console.log('No products found in DB.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
