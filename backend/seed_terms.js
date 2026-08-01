const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');

require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

const contentJson = JSON.stringify({
  blocks: [
    {
      type: "heading",
      text: "Florie Prive : Terms & Conditions"
    },
    {
      type: "paragraph",
      text: "Florie Prive is Florie's loyalty program which is open to registered Users on the Florie platform (\"Platform\") subject to the Terms of Use, Privacy Policy and below mentioned terms and conditions. Capitalized terms not defined herein shall have the meaning ascribed to it under the Terms of Use or Privacy Policy."
    },
    {
      type: "subheading",
      text: "Membership"
    },
    {
      type: "subheading",
      text: "Free Membership:"
    },
    {
      type: "paragraph",
      text: "There are three tiers of membership for Florie Prive based on the total purchase price paid for the Products (less GST, Returns and delivery charges) (\"Purchases\"). There is no membership fee to participate in Florie's Prive Membership. Users are required to be registered on the Florie Platform."
    },
    {
      type: "bullet",
      text: "Users who make a minimum Purchases of INR 2000 (excluding returns) on the platform, shall be eligible for Florie Prive membership's Base Tier Prive Member."
    },
    {
      type: "bullet",
      text: "Users who make a minimum Purchases of minimum INR 5000, in a rolling year (excluding returns), shall be eligible or get upgraded for Florie Prive membership's Middle Tier, i.e. Prive Gold."
    },
    {
      type: "bullet",
      text: "Users who make a minimum purchase of minimum INR 10,000, in a rolling year (excluding returns), shall be eligible for or get upgraded to Florie Prive membership's Top Tier, i.e. Prive Platinum."
    },
    {
      type: "paragraph",
      text: "Once a User passes the above mentioned threshold(s), the User shall be notified on their registered email id about their membership registration and/or upgrades as part of the Florie Prive program. This notification shall be sent only to registered Users of the platform to their registered email id."
    }
  ]
});

async function seed() {
  const existing = await prisma.contentArticle.findUnique({
    where: { slug: 'terms-and-conditions' }
  });

  if (existing) {
    await prisma.contentArticle.update({
      where: { slug: 'terms-and-conditions' },
      data: { contentJson, published: true, type: 'PAGE', title: 'Terms & Conditions' }
    });
    console.log('Updated existing Terms & Conditions article.');
  } else {
    await prisma.contentArticle.create({
      data: {
        title: 'Terms & Conditions',
        slug: 'terms-and-conditions',
        type: 'PAGE',
        contentJson,
        published: true
      }
    });
    console.log('Created new Terms & Conditions article.');
  }
}

seed().catch(console.error).finally(() => prisma.$disconnect());
