require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({
    where: { name: { contains: 'COSKINn' } }
  });
  console.log('Found', products.length, 'products containing COSKINn');
  
  for (const p of products) {
    const newName = p.name.replace(/COSKINn/g, 'Fairenne');
    await prisma.product.update({
      where: { id: p.id },
      data: { name: newName }
    });
    console.log('Updated:', newName);
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
