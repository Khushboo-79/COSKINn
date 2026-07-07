import { Pool } from 'pg';
import 'dotenv/config';

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Updating admin phone number...');
    const result = await pool.query(`UPDATE "users" SET phone = '+1234567890' WHERE email = 'admin@coskinn.com'`);
    console.log(`Updated ${result.rowCount} user(s).`);
  } catch (error) {
    console.error(error);
  } finally {
    await pool.end();
  }
}
main();
