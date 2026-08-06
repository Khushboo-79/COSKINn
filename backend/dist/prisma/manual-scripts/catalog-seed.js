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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path.join(__dirname, '../../.env') });
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter, log: ['error'] });
function generateSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
async function main() {
    console.log('Starting Catalog Seed from catalog.json...');
    const dataPath = path.join(__dirname, 'catalog.json');
    if (!fs.existsSync(dataPath)) {
        console.error('catalog.json not found in manual-scripts dir');
        process.exit(1);
    }
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const productsData = JSON.parse(rawData);
    console.log(`Loaded ${productsData.length} products to seed.`);
    await prisma.productImage.deleteMany({});
    await prisma.productSkinType.deleteMany({});
    await prisma.productConcern.deleteMany({});
    await prisma.productIngredient.deleteMany({});
    await prisma.productBenefit.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    const categoriesSet = new Set();
    productsData.forEach((p) => {
        if (p.category)
            categoriesSet.add(p.category);
    });
    const categoryMap = new Map();
    for (const catName of Array.from(categoriesSet)) {
        const slug = generateSlug(catName);
        const cat = await prisma.category.create({
            data: {
                name: catName,
                slug: slug,
                isActive: true,
            }
        });
        categoryMap.set(catName, cat.id);
        console.log(`Created Category: ${catName}`);
    }
    if (!categoryMap.has('Skincare')) {
        const cat = await prisma.category.create({ data: { name: 'Skincare', slug: 'skincare' } });
        categoryMap.set('Skincare', cat.id);
    }
    for (const p of productsData) {
        const slug = generateSlug(p.name);
        const categoryId = categoryMap.get(p.category) || categoryMap.get('Skincare');
        const product = await prisma.product.create({
            data: {
                name: p.name,
                slug: slug,
                categoryId: categoryId,
                description: p.longDescription || p.shortDescription || '',
                howToUse: typeof p.howToUse === 'string' ? p.howToUse : JSON.stringify(p.howToUse) || '',
                mrp: p.originalPrice || p.price || 0,
                discountPrice: p.price,
                status: 'LIVE',
                countryOfOrigin: p.countryOfOrigin || 'India',
                manufacturerName: p.manufacturedBy || 'Fairenne Labs',
                images: {
                    create: (p.images || [p.image]).map((imgUrl, idx) => ({
                        url: imgUrl,
                        isPrimary: idx === 0,
                        sortOrder: idx
                    }))
                }
            }
        });
        if (p.suitableSkinType) {
            const types = p.suitableSkinType.split(',').map((s) => s.trim().replace(' Skin', ''));
            for (const t of types) {
                if (t === 'All' || t === 'All Types') {
                    const standardTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
                    for (const st of standardTypes) {
                        await prisma.productSkinType.create({ data: { name: st, productId: product.id } });
                    }
                }
                else {
                    await prisma.productSkinType.create({ data: { name: t, productId: product.id } });
                }
            }
        }
        if (p.skinConcerns) {
            const concerns = p.skinConcerns.split(',').map((s) => s.trim());
            for (const c of concerns) {
                await prisma.productConcern.create({ data: { name: c, productId: product.id } });
            }
        }
        if (p.benefits) {
            for (const b of p.benefits) {
                const nameStr = typeof b === 'string' ? b : (b.title || JSON.stringify(b));
                await prisma.productBenefit.create({ data: { name: nameStr, productId: product.id } });
            }
        }
        if (p.keyIngredients) {
            for (const i of p.keyIngredients) {
                await prisma.productIngredient.create({ data: { name: i, productId: product.id } });
            }
        }
        console.log(`Created Product: ${p.name}`);
    }
    console.log('Catalog Seeding Complete.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=catalog-seed.js.map