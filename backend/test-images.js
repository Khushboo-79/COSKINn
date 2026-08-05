const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.product.findMany({ include: { images: true }, orderBy: { createdAt: 'desc' }, take: 10 })
  .then(products => console.log(JSON.stringify(products.map(p => ({ name: p.name, images: p.images })), null, 2)))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
