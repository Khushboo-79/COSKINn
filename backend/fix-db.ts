import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter, log: ['error'] });

async function main() {
  const users = await prisma.user.findMany({
    where: { phone: '+919039567767' }
  });
  console.log('Users with +919039567767:', users.map(u => u.email));
  
  if (users.length > 0) {
    const user = users[0];
    if (user.email !== 'admin@fairenne.com') {
      console.log('Updating email of', user.email, 'to admin@fairenne.com');
      await prisma.user.update({
        where: { id: user.id },
        data: { email: 'admin@fairenne.com' }
      });
    }
    
    // Also reset password to admin123 just in case
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.update({
        where: { id: user.id },
        data: { passwordHash }
    });
    console.log('Reset password to admin123');
  } else {
    console.log('No user found with +919039567767');
  }
}
main().finally(() => prisma.$disconnect());
