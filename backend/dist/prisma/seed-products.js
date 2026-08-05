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
async function main() {
    console.log('Starting seed...');
    const categories = [
        { name: 'Cleansers', slug: 'cleansers', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Moisturizers', slug: 'moisturizers', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Serums', slug: 'serums', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Sunscreens', slug: 'sunscreens', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Toners', slug: 'toners', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Face Masks', slug: 'face-masks', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Eye Creams', slug: 'eye-creams', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Lip Care', slug: 'lip-care', productLine: client_1.ProductLine.SKINCARE },
        { name: 'Foundations', slug: 'foundations', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Concealers', slug: 'concealers', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Lipsticks', slug: 'lipsticks', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Eyeshadows', slug: 'eyeshadows', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Mascaras', slug: 'mascaras', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Blushes', slug: 'blushes', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Highlighters', slug: 'highlighters', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Bronzers', slug: 'bronzers', productLine: client_1.ProductLine.MAKEUP },
        { name: 'Hybrid Tints', slug: 'hybrid-tints', productLine: client_1.ProductLine.BOTH },
    ];
    const dbCategories = [];
    for (const cat of categories) {
        const created = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: { productLine: cat.productLine },
            create: cat,
        });
        dbCategories.push(created);
    }
    const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
    const finishes = ['Matte', 'Dewy', 'Satin', 'Natural', 'Luminous'];
    let productCount = 0;
    for (const cat of dbCategories) {
        const numProducts = Math.floor(Math.random() * 2) + 3;
        for (let i = 1; i <= numProducts; i++) {
            productCount++;
            const isSkincare = cat.productLine === 'SKINCARE';
            const name = `Fairenne ${cat.name.slice(0, -1)} ${isSkincare ? 'Glow' : 'Glam'} ${i} - ${Math.random().toString(36).substring(7).toUpperCase()}`;
            const slug = `fairenne-${cat.slug}-prod-${i}-${Date.now()}`;
            const basePrice = 500 + (Math.floor(Math.random() * 10) * 100);
            const discount = basePrice - 100;
            const product = await prisma.product.create({
                data: {
                    categoryId: cat.id,
                    name,
                    slug,
                    description: `This is an amazing ${cat.name.slice(0, -1)} that provides excellent results. Formulated with the best ingredients.`,
                    mrp: basePrice,
                    discountPrice: discount,
                    status: client_1.ProductStatus.LIVE,
                    productLine: cat.productLine,
                    isCrossSegment: cat.productLine === 'BOTH',
                    manufacturerName: 'Fairenne Labs India',
                    manufacturerAddress: '123 Beauty Park, Mumbai, MH, India',
                    countryOfOrigin: 'India',
                    testReportRef: `TEST-REP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
                    variants: {
                        create: [
                            {
                                sku: `SKU-${slug}-V1`,
                                name: isSkincare ? '50ml' : 'Standard Shade',
                                netQuantity: isSkincare ? '50ml' : '10g',
                                mrp: basePrice,
                                price: discount,
                            }
                        ]
                    },
                    images: {
                        create: [
                            {
                                url: isSkincare
                                    ? 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400'
                                    : 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=400',
                                isPrimary: true,
                                altText: name,
                            }
                        ]
                    },
                    skinTypes: {
                        create: isSkincare
                            ? [
                                { name: skinTypes[Math.floor(Math.random() * skinTypes.length)] },
                                { name: 'All Skin Types' }
                            ]
                            : []
                    },
                    concerns: {
                        create: !isSkincare
                            ? [
                                { name: `Finish: ${finishes[Math.floor(Math.random() * finishes.length)]}` }
                            ]
                            : [
                                { name: 'Hydration' },
                                { name: 'Brightening' }
                            ]
                    }
                }
            });
            console.log(`Created product: ${product.name}`);
        }
    }
    console.log(`Successfully created ${dbCategories.length} categories and ${productCount} products.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-products.js.map