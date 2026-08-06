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
async function backfillInventory() {
    console.log('Starting Inventory backfill for all ProductVariants...');
    let warehouse = await prisma.warehouse.findFirst({
        where: { code: 'WH-MAIN' }
    });
    if (!warehouse) {
        warehouse = await prisma.warehouse.create({
            data: {
                code: 'WH-MAIN',
                name: 'COSKINn Central Warehouse',
                address: '100 Luxury Avenue, Mumbai, India',
                isActive: true
            }
        });
        console.log(`Created default warehouse: WH-MAIN (${warehouse.id})`);
    }
    else {
        console.log(`Found existing warehouse: WH-MAIN (${warehouse.id})`);
    }
    const variants = await prisma.productVariant.findMany();
    console.log(`Found ${variants.length} ProductVariant records.`);
    let createdCount = 0;
    let updatedCount = 0;
    for (const variant of variants) {
        const existing = await prisma.inventoryStock.findUnique({
            where: {
                warehouseId_sku: {
                    warehouseId: warehouse.id,
                    sku: variant.sku
                }
            }
        });
        if (!existing) {
            await prisma.inventoryStock.create({
                data: {
                    warehouseId: warehouse.id,
                    sku: variant.sku,
                    quantity: 10000,
                    reservedQty: 0
                }
            });
            createdCount++;
        }
        else if (existing.quantity < 100) {
            await prisma.inventoryStock.update({
                where: { id: existing.id },
                data: {
                    quantity: 10000
                }
            });
            updatedCount++;
        }
    }
    console.log(`Inventory Backfill complete! Added stock for ${createdCount} SKUs, updated ${updatedCount} SKUs.`);
}
backfillInventory()
    .catch(console.error)
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=backfill-inventory.js.map