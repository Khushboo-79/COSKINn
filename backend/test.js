const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const cat = await prisma.category.create({
      data: { name: 'TestCat2', slug: 'testcat2' }
    });
    console.log("Success:", cat);
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}
main();
