const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const returns = await prisma.return.findMany();
    console.log('Total returns in database:', returns.length);
    console.log(returns);
  } catch(e) {
    console.error(e);
  }
}
main();
