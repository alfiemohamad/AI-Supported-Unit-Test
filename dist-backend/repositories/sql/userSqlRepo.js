"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlUserRepository = void 0;
const pg_1 = require("./pg");
exports.sqlUserRepository = {
    async create(user) {
        const result = await pg_1.pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [user.username, user.password]);
        return result.rows[0];
    },
    async findByUsername(username) {
        const result = await pg_1.pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0] || null;
    },
    async findById(id) {
        const result = await pg_1.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
};
