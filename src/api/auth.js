"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userSqlRepo_1 = require("../repositories/sql/userSqlRepo");
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
// Register endpoint
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ error: 'Username and password required' });
        return;
    }
    const existing = await userSqlRepo_1.sqlUserRepository.findByUsername(username);
    if (existing) {
        res.status(409).json({ error: 'Username already exists' });
        return;
    }
    const hashed = await (0, auth_1.hashPassword)(password);
    const user = await userSqlRepo_1.sqlUserRepository.create({ username, password: hashed });
    res.status(201).json({ id: user.id, username: user.username });
});
// Login endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await userSqlRepo_1.sqlUserRepository.findByUsername(username);
    if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
    const valid = await (0, auth_1.comparePassword)(password, user.password);
    if (!valid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
    }
    const token = (0, auth_1.generateToken)({ id: user.id, username: user.username });
    res.json({ token });
});
exports.default = router;
