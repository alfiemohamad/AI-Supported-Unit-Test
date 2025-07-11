import { testConnection, pool } from './pg';

describe('pg.ts', () => {
  it('should connect to PostgreSQL and run a simple query', async () => {
    await expect(testConnection()).resolves.toBeUndefined();
  });

  it('should be able to run a query via pool', async () => {
    const res = await pool.query('SELECT 1 as result');
    expect(res.rows[0].result).toBe(1);
  });

  it('should throw error if query is invalid', async () => {
    await expect(pool.query('SELECT * FROM not_a_table')).rejects.toThrow();
  });

  /*
  it('should fail to connect with wrong host', async () => {
    const { Pool } = await import('pg');
    const badPool = new Pool({
      host: 'wronghost',
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
      connectionTimeoutMillis: 1000,
    });
    let errorCaught = false;
    try {
      await badPool.query('SELECT 1');
    } catch (err) {
      errorCaught = true;
      expect(err).toBeDefined();
    } finally {
      await badPool.end();
    }
    expect(errorCaught).toBe(true);
  });
  */
});
