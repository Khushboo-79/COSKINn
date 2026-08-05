const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 
async function main() { 
  const stocks = await prisma.inventoryStock.findMany({ take: 10 }); 
  console.log('STOCKS:', stocks.map(s => s.sku)); 
  const variants = await prisma.productVariant.findMany({ take: 10 }); 
  console.log('VARIANTS:', variants.map(v => v.sku)); 
} 
main().finally(() => prisma.$disconnect());
