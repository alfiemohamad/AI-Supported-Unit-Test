import { Router, Request, Response } from 'express';
import { sqlUserRepository } from '../repositories/sql/userSqlRepo';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered
 *       400:
 *         description: Bad request
 *       409:
 *         description: Username or email already exists
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  // Validasi field wajib
  if (!username || typeof username !== 'string' || !username.trim()) {
    res.status(400).json({ error: 'Username is required' });
    return;
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'Password is required' });
    return;
  }
  // Validasi format email
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }
  // Validasi panjang password
  if (password.length < 6) {
    res.status(400).json({ error: 'Password too short' });
    return;
  }
  // Cek duplikasi username/email
  const existingUsername = await sqlUserRepository.findByUsername(username);
  if (existingUsername) {
    res.status(409).json({ error: 'Username already exists' });
    return;
  }
  const existingEmail = await sqlUserRepository.findByEmail(email);
  if (existingEmail) {
    res.status(409).json({ error: 'Email already exists' });
    return;
  }
  const hashed = await hashPassword(password);
  const user = await sqlUserRepository.create({ username, email, password: hashed });
  res.status(201).json({ id: user.id, username: user.username, email: user.email });
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  // Validasi field wajib
  if (!email || typeof email !== 'string' || !email.trim()) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }
  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'Password is required' });
    return;
  }
  // Validasi format email
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    res.status(400).json({ error: 'Invalid email format' });
    return;
  }
  const user = await sqlUserRepository.findByEmail(email);
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  // Validasi panjang password (opsional, untuk konsistensi)
  if (password.length < 6) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const valid = await comparePassword(password, user.password);
  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const token = generateToken({ id: user.id, email: user.email });
  res.json({ token });
});

export default router;
