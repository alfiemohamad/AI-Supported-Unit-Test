"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
describe('utils/auth', () => {
    it('should generate and verify JWT token', () => {
        const payload = { id: 1, email: 'a@b.com' };
        const token = (0, auth_1.generateToken)(payload);
        const decoded = (0, auth_1.verifyToken)(token);
        expect(decoded).toMatchObject(payload);
    });
    it('should throw error for invalid JWT token', () => {
        expect(() => (0, auth_1.verifyToken)('invalid.token')).toThrow();
    });
    it('should hash and compare password correctly', async () => {
        const password = 'secret123';
        const hash = await (0, auth_1.hashPassword)(password);
        expect(hash).not.toBe(password);
        const isMatch = await (0, auth_1.comparePassword)(password, hash);
        expect(isMatch).toBe(true);
        const isNotMatch = await (0, auth_1.comparePassword)('wrong', hash);
        expect(isNotMatch).toBe(false);
    });
    it('should call next if valid Bearer token', () => {
        const payload = { id: 1 };
        const token = (0, auth_1.generateToken)(payload);
        const req = { headers: { authorization: `Bearer ${token}` } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        (0, auth_1.authMiddleware)(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.user).toMatchObject(payload);
    });
    it('should return 401 if no auth header', () => {
        const req = { headers: {} };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        (0, auth_1.authMiddleware)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
        expect(next).not.toHaveBeenCalled();
    });
    it('should return 401 if invalid token', () => {
        const req = { headers: { authorization: 'Bearer invalidtoken' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const next = jest.fn();
        (0, auth_1.authMiddleware)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
        expect(next).not.toHaveBeenCalled();
    });
});
