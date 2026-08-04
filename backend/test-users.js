require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query("SELECT email FROM users WHERE email LIKE 'admin%'", (err, res) => {
  if (err) console.error(err);
  else console.log(res.rows);
  pool.end();
});
