const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const settings = await prisma.supportSettings.findFirst();
    console.log(settings);
  } catch(e) {
    console.error(e);
  }
}
main();
