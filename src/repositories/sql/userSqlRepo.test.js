"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userSqlRepo_1 = require("./userSqlRepo");
const pg_1 = require("./pg");
describe('sqlUserRepository', () => {
    let userId;
    const user = { username: 'repoUser', email: 'repoUser@example.com', password: 'hash' };
    afterAll(async () => {
        await pg_1.pool.query('DELETE FROM users WHERE email = $1', [user.email]);
        await pg_1.pool.end();
    });
    it('should create user', async () => {
        const created = await userSqlRepo_1.sqlUserRepository.create(user);
        expect(created).toHaveProperty('id');
        expect(created).toHaveProperty('username', user.username);
        expect(created).toHaveProperty('email', user.email);
        userId = created.id;
    });
    it('should find user by username', async () => {
        const found = await userSqlRepo_1.sqlUserRepository.findByUsername(user.username);
        expect(found).not.toBeNull();
        expect(found?.email).toBe(user.email);
    });
    it('should find user by email', async () => {
        const found = await userSqlRepo_1.sqlUserRepository.findByEmail(user.email);
        expect(found).not.toBeNull();
        expect(found?.username).toBe(user.username);
    });
    it('should find user by id', async () => {
        const found = await userSqlRepo_1.sqlUserRepository.findById(userId);
        expect(found).not.toBeNull();
        expect(found?.email).toBe(user.email);
    });
    it('should return null for not found', async () => {
        expect(await userSqlRepo_1.sqlUserRepository.findByUsername('notfound')).toBeNull();
        expect(await userSqlRepo_1.sqlUserRepository.findByEmail('notfound@example.com')).toBeNull();
        expect(await userSqlRepo_1.sqlUserRepository.findById(999999)).toBeNull();
    });
});
