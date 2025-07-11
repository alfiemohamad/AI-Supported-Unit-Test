import { generateToken, verifyToken, hashPassword, comparePassword, authMiddleware } from './auth';
import type { Request, Response, NextFunction } from 'express';

describe('utils/auth', () => {
  it('should generate and verify JWT token', () => {
    const payload = { id: 1, email: 'a@b.com' };
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    expect(decoded).toMatchObject(payload);
  });

  it('should throw error for invalid JWT token', () => {
    expect(() => verifyToken('invalid.token')).toThrow();
  });

  it('should hash and compare password correctly', async () => {
    const password = 'secret123';
    const hash = await hashPassword(password);
    expect(hash).not.toBe(password);
    const isMatch = await comparePassword(password, hash);
    expect(isMatch).toBe(true);
    const isNotMatch = await comparePassword('wrong', hash);
    expect(isNotMatch).toBe(false);
  });

  it('should call next if valid Bearer token', () => {
    const payload = { id: 1 };
    const token = generateToken(payload);
    const req = { headers: { authorization: `Bearer ${token}` } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();
    authMiddleware(req as Request, res as Response, next as NextFunction);
    expect(next).toHaveBeenCalled();
    expect((req as any).user).toMatchObject(payload);
  });

  it('should return 401 if no auth header', () => {
    const req = { headers: {} } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();
    authMiddleware(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if invalid token', () => {
    const req = { headers: { authorization: 'Bearer invalidtoken' } } as Partial<Request>;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn();
    authMiddleware(req as Request, res as Response, next as NextFunction);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
