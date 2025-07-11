"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const pg_1 = require("../repositories/sql/pg");
describe('Auth API', () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/auth', auth_1.default);
    const testUser = {
        username: 'testuser',
        email: 'testuser@email.com',
        password: 'testpass123',
    };
    afterAll(async () => {
        await pg_1.pool.query('DELETE FROM users WHERE email = $1', [testUser.email]);
        await pg_1.pool.end();
    });
    it('should register a new user', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send(testUser);
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('username', testUser.username);
        expect(res.body).toHaveProperty('email', testUser.email);
    });
    it('should not register with duplicate email', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send(testUser);
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should not register with duplicate username', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ ...testUser, email: 'other@email.com' });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 409 if email already exists (different username)', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'anotheruser', email: testUser.email, password: 'testpass123' });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 409 if username already exists (different email)', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: testUser.username, email: 'unique@email.com', password: 'testpass123' });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if register missing fields', async () => {
        const res1 = await (0, supertest_1.default)(app).post('/auth/register').send({});
        expect(res1.status).toBe(400);
        const res2 = await (0, supertest_1.default)(app).post('/auth/register').send({ username: 'a', password: '123' });
        expect(res2.status).toBe(400);
        const res3 = await (0, supertest_1.default)(app).post('/auth/register').send({ username: 'a', email: 'a@b.com' });
        expect(res3.status).toBe(400);
    });
    it('should return 400 if register with invalid email format', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'invalidemail', email: 'notanemail', password: '123456' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if register with short password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'shortpass', email: 'shortpass@email.com', password: '1' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if register with missing email', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'nouser', password: 'testpass123' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if register with missing username', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ email: 'nouser@example.com', password: 'testpass123' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if register with missing password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'nouser', email: 'nouser@example.com' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 409 if register with existing email', async () => {
        // Register user first
        await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'uniqueuser', email: 'unique@example.com', password: 'testpass123' });
        // Try register with same email
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'otheruser', email: 'unique@example.com', password: 'testpass123' });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 409 if register with existing username', async () => {
        // Register user first
        await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'uniqueuser2', email: 'unique2@example.com', password: 'testpass123' });
        // Try register with same username
        const res = await (0, supertest_1.default)(app)
            .post('/auth/register')
            .send({ username: 'uniqueuser2', email: 'other2@example.com', password: 'testpass123' });
        expect(res.status).toBe(409);
        expect(res.body).toHaveProperty('error');
    });
    it('should login with correct email and password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: testUser.email, password: testUser.password });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
    it('should not login with wrong password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: testUser.email, password: 'wrongpass' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('should not login with unregistered email', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'notfound@example.com', password: 'any' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if login missing fields', async () => {
        const res1 = await (0, supertest_1.default)(app).post('/auth/login').send({ password: '123' });
        expect(res1.status).toBe(400);
        const res2 = await (0, supertest_1.default)(app).post('/auth/login').send({ email: 'a@b.com' });
        expect(res2.status).toBe(400);
    });
    it('should return 400 if login with empty body', async () => {
        const res = await (0, supertest_1.default)(app).post('/auth/login').send({});
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 401 if login with correct email but wrong password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: testUser.email, password: 'incorrect' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 401 if login with non-existent email', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'notfound@email.com', password: 'any' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if login with invalid email format', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'notanemail', password: '123456' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 401 if login with short password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: testUser.email, password: '1' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if login with missing email', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ password: 'testpass123' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
    it('should return 400 if login with missing password', async () => {
        const res = await (0, supertest_1.default)(app)
            .post('/auth/login')
            .send({ email: 'nouser@example.com' });
        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
