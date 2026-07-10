const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function seed() {
  await prisma.category.create({ data: { name: 'Skincare', slug: 'skincare', isActive: true, subcategories: { create: [{ name: 'Serums', slug: 'serums', isActive: true }, { name: 'Cleansers', slug: 'cleansers', isActive: true }] } } });
  await prisma.category.create({ data: { name: 'Makeup', slug: 'makeup', isActive: true, subcategories: { create: [{ name: 'Lipsticks', slug: 'lipsticks', isActive: true }] } } });
  console.log('Categories seeded successfully!');
}
seed().catch(console.error).finally(() => prisma.$disconnect());
