import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT),
});

export async function testConnection() {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connection successful');
  } catch (err) {
    console.error('PostgreSQL connection failed:', err);
    process.exit(1);
  }
}
