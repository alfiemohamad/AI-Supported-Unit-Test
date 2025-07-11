import { sqlUserRepository } from './userSqlRepo';
import { pool } from './pg';

describe('sqlUserRepository', () => {
  let userId: number;
  const user = { username: 'repoUser', email: 'repoUser@example.com', password: 'hash' };

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', [user.email]);
    await pool.end();
  });

  it('should create user', async () => {
    const created = await sqlUserRepository.create(user);
    expect(created).toHaveProperty('id');
    expect(created).toHaveProperty('username', user.username);
    expect(created).toHaveProperty('email', user.email);
    userId = created.id;
  });

  it('should find user by username', async () => {
    const found = await sqlUserRepository.findByUsername(user.username);
    expect(found).not.toBeNull();
    expect(found?.email).toBe(user.email);
  });

  it('should find user by email', async () => {
    const found = await sqlUserRepository.findByEmail(user.email);
    expect(found).not.toBeNull();
    expect(found?.username).toBe(user.username);
  });

  it('should find user by id', async () => {
    const found = await sqlUserRepository.findById(userId);
    expect(found).not.toBeNull();
    expect(found?.email).toBe(user.email);
  });

  it('should return null for not found', async () => {
    expect(await sqlUserRepository.findByUsername('notfound')).toBeNull();
    expect(await sqlUserRepository.findByEmail('notfound@example.com')).toBeNull();
    expect(await sqlUserRepository.findById(999999)).toBeNull();
  });
});
