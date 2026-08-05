require('dotenv').config();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const passwordHash = await bcrypt.hash('admin123', 10);
  console.log("New hash:", passwordHash);
  pool.query("UPDATE users SET \"passwordHash\" = $1 WHERE email='admin@coskinn.com'", [passwordHash], (err, res) => {
    if (err) console.error(err);
    else console.log("Password updated!");
    pool.end();
  });
}
main();
