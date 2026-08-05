"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter, log: ['error'] });
async function backfillVariants() {
    console.log('Starting backfill for missing product variants...');
    const products = await prisma.product.findMany({
        include: {
            variants: true
        }
    });
    console.log(`Total products checked: ${products.length}`);
    let createdCount = 0;
    for (const product of products) {
        if (!product.variants || product.variants.length === 0) {
            const defaultSku = `SKU-${product.id.slice(0, 8).toUpperCase()}-DEF`;
            const baseMrp = Number(product.mrp || product.discountPrice || 499);
            const basePrice = Number(product.discountPrice || product.mrp || 399);
            try {
                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        sku: defaultSku,
                        name: 'Standard',
                        mrp: baseMrp,
                        price: basePrice
                    }
                });
                createdCount++;
                console.log(`Created default variant [${defaultSku}] for product: ${product.name}`);
            }
            catch (err) {
                const fallbackSku = `SKU-${product.id.slice(0, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
                await prisma.productVariant.create({
                    data: {
                        productId: product.id,
                        sku: fallbackSku,
                        name: 'Standard',
                        mrp: baseMrp,
                        price: basePrice
                    }
                });
                createdCount++;
                console.log(`Created fallback variant [${fallbackSku}] for product: ${product.name}`);
            }
        }
    }
    console.log(`Backfill complete. Created ${createdCount} default ProductVariant records.`);
}
backfillVariants()
    .catch((e) => {
    console.error('Backfill error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=backfill-variants.js.map