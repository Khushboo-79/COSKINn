"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
require("dotenv/config");
async function main() {
    const pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        console.log('Updating admin phone number...');
        const result = await pool.query(`UPDATE "users" SET phone = '+1234567890' WHERE email = 'admin@fairenne.com'`);
        console.log(`Updated ${result.rowCount} user(s).`);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await pool.end();
    }
}
main();
//# sourceMappingURL=update-phone.js.map