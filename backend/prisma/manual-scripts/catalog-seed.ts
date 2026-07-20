import { PrismaClient, ProductStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

function generateSlug(text: string) {
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

  const categoriesSet = new Set<string>();
  productsData.forEach((p: any) => {
    if (p.category) categoriesSet.add(p.category);
  });

  const categoryMap = new Map<string, string>();
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
        categoryId: categoryId as string,
        description: p.longDescription || p.shortDescription || '',
        howToUse: typeof p.howToUse === 'string' ? p.howToUse : JSON.stringify(p.howToUse) || '',
        mrp: p.originalPrice || p.price || 0,
        discountPrice: p.price,
        status: 'LIVE',
        countryOfOrigin: p.countryOfOrigin || 'India',
        manufacturerName: p.manufacturedBy || 'COSKINn Labs',
        
        images: {
          create: (p.images || [p.image]).map((imgUrl: string, idx: number) => ({
            url: imgUrl,
            isPrimary: idx === 0,
            sortOrder: idx
          }))
        }
      }
    });

    if (p.suitableSkinType) {
      const types = p.suitableSkinType.split(',').map((s: string) => s.trim().replace(' Skin', ''));
      for (const t of types) {
        if (t === 'All' || t === 'All Types') {
          const standardTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
          for (const st of standardTypes) {
            await prisma.productSkinType.create({ data: { name: st, productId: product.id } });
          }
        } else {
          await prisma.productSkinType.create({ data: { name: t, productId: product.id } });
        }
      }
    }

    if (p.skinConcerns) {
      const concerns = p.skinConcerns.split(',').map((s: string) => s.trim());
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
