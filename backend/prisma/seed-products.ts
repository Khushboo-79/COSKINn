import 'dotenv/config';
import { PrismaClient, ProductLine, ProductStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Starting seed...');

  // 1. Categories
  const categories = [
    { name: 'Cleansers', slug: 'cleansers', productLine: ProductLine.SKINCARE },
    { name: 'Moisturizers', slug: 'moisturizers', productLine: ProductLine.SKINCARE },
    { name: 'Serums', slug: 'serums', productLine: ProductLine.SKINCARE },
    { name: 'Sunscreens', slug: 'sunscreens', productLine: ProductLine.SKINCARE },
    { name: 'Toners', slug: 'toners', productLine: ProductLine.SKINCARE },
    { name: 'Face Masks', slug: 'face-masks', productLine: ProductLine.SKINCARE },
    { name: 'Eye Creams', slug: 'eye-creams', productLine: ProductLine.SKINCARE },
    { name: 'Lip Care', slug: 'lip-care', productLine: ProductLine.SKINCARE },

    { name: 'Foundations', slug: 'foundations', productLine: ProductLine.MAKEUP },
    { name: 'Concealers', slug: 'concealers', productLine: ProductLine.MAKEUP },
    { name: 'Lipsticks', slug: 'lipsticks', productLine: ProductLine.MAKEUP },
    { name: 'Eyeshadows', slug: 'eyeshadows', productLine: ProductLine.MAKEUP },
    { name: 'Mascaras', slug: 'mascaras', productLine: ProductLine.MAKEUP },
    { name: 'Blushes', slug: 'blushes', productLine: ProductLine.MAKEUP },
    { name: 'Highlighters', slug: 'highlighters', productLine: ProductLine.MAKEUP },
    { name: 'Bronzers', slug: 'bronzers', productLine: ProductLine.MAKEUP },
    
    { name: 'Hybrid Tints', slug: 'hybrid-tints', productLine: ProductLine.BOTH },
  ];

  const dbCategories: any[] = [];
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { productLine: cat.productLine },
      create: cat,
    });
    dbCategories.push(created);
  }

  // Helper arrays for realistic attributes
  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
  const finishes = ['Matte', 'Dewy', 'Satin', 'Natural', 'Luminous'];

  // Generate products
  let productCount = 0;
  for (const cat of dbCategories) {
    // 3-4 products per category
    const numProducts = Math.floor(Math.random() * 2) + 3;
    for (let i = 1; i <= numProducts; i++) {
      productCount++;
      const isSkincare = cat.productLine === 'SKINCARE';
      const name = `COSKINn ${cat.name.slice(0, -1)} ${isSkincare ? 'Glow' : 'Glam'} ${i} - ${Math.random().toString(36).substring(7).toUpperCase()}`;
      const slug = `coskinn-${cat.slug}-prod-${i}-${Date.now()}`;
      
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
          status: ProductStatus.LIVE,
          productLine: cat.productLine,
          isCrossSegment: cat.productLine === 'BOTH',
          manufacturerName: 'COSKINn Labs India',
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
          // Simulating some shade/finish data in concerns or just as tags could be done, 
          // but for now keeping it simple.
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
