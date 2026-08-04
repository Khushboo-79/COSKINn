"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function run() {
    const allCartItems = await prisma.cartItem.findMany();
    console.log(`Found ${allCartItems.length} cart items.`);
    for (const item of allCartItems) {
        let variant = null;
        if (item.variantId) {
            variant = await prisma.productVariant.findUnique({ where: { id: item.variantId } });
        }
        else {
            variant = await prisma.productVariant.findFirst({ where: { productId: item.productId } });
        }
        console.log(`Cart Item: ${item.id}, variantId: ${item.variantId}, productId: ${item.productId}, variantFound: ${!!variant}, variantSKU: ${variant?.sku}`);
    }
}
run()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=debug_cart.js.map