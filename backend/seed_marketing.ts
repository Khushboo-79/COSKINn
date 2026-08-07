import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

async function main() {
  console.log('Seeding Testimonials and Promotions...');
  
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter, log: ['error'] });

  // Clear existing if any
  await prisma.testimonial.deleteMany();
  await prisma.promotion.deleteMany();

  // Testimonials
  const skinReviews = [
    { text: "My skin is bouncing back to life.", author: "Priya", product: "Peach Serum" },
    { text: "Sorbet cleanser = actual joy.", author: "Amelia", product: "Strawberry Cleanser" },
    { text: "The glow is unreal.", author: "Sarah", product: "Watermelon Mask" },
    { text: "Love the natural glow.", author: "Neha", product: "Glow Oil" },
    { text: "Hydration all day long.", author: "Simran", product: "Aqua Cream" },
  ];
  const glamReviews = [
    { text: "The pigment is out of this world.", author: "Elena", product: "Scarlet Kiss" },
    { text: "Flawless finish that lasts all day.", author: "Sofia", product: "Velvet Foundation" },
    { text: "I feel like a movie star.", author: "Chloe", product: "Golden Hour" },
    { text: "The ultimate red lip.", author: "Kiara", product: "Ruby Matte" },
    { text: "Stunning highlight.", author: "Meera", product: "Glow Powder" },
  ];

  for (let i = 0; i < skinReviews.length; i++) {
    await prisma.testimonial.create({
      data: { platform: 'SKINCARE', sortOrder: i, ...skinReviews[i] }
    });
  }
  for (let i = 0; i < glamReviews.length; i++) {
    await prisma.testimonial.create({
      data: { platform: 'COSMETICS', sortOrder: i, ...glamReviews[i] }
    });
  }

  // Promotions
  const skinPromotions = [
    { title: "Free 3-piece juicy set", sub: "On orders over ₹1500", cta: "Shop the treat", bg: '#ffe4e1', text: '#2a2a2a', muted: '#6b7280' },
    { title: "Loyalty × 2 points", sub: "This weekend only", cta: "Join the Glow Club", bg: '#e0f5ea', text: '#2a2a2a', muted: '#6b7280' },
    { title: "Free Express shipping", sub: "Over ₹999 · everywhere", cta: "Learn more", bg: '#fff3b8', text: '#2a2a2a', muted: '#6b7280' }
  ];
  const glamPromotions = [
    { title: "Complimentary engraving", sub: "On lipsticks & compacts", cta: "PERSONALISE YOURS", bg: '#f9f9f9', text: '#1a1a1a', muted: '#6b7280' },
    { title: "Velvet Atelier rewards", sub: "Earn double this fortnight", cta: "ENTER THE COURT", bg: '#f9f9f9', text: '#1a1a1a', muted: '#6b7280' },
    { title: "Free Express delivery", sub: "On orders over ₹1999", cta: "DISCOVER MORE", bg: '#f9f9f9', text: '#1a1a1a', muted: '#6b7280' }
  ];

  for (let i = 0; i < skinPromotions.length; i++) {
    await prisma.promotion.create({
      data: { platform: 'SKINCARE', sortOrder: i, ...skinPromotions[i] }
    });
  }
  for (let i = 0; i < glamPromotions.length; i++) {
    await prisma.promotion.create({
      data: { platform: 'COSMETICS', sortOrder: i, ...glamPromotions[i] }
    });
  }

  console.log('Successfully seeded testimonials and promotions!');
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
