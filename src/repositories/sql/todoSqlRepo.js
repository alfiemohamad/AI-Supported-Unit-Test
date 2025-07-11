"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlTaskRepository = exports.sqlListRepository = void 0;
const pg_1 = require("./pg");
exports.sqlListRepository = {
    async create(list) {
        const result = await pg_1.pool.query('INSERT INTO lists (user_id, name) VALUES ($1, $2) RETURNING *', [list.user_id, list.name]);
        return result.rows[0];
    },
    async findByUser(user_id) {
        const result = await pg_1.pool.query('SELECT * FROM lists WHERE user_id = $1', [user_id]);
        return result.rows;
    },
    async findById(id) {
        const result = await pg_1.pool.query('SELECT * FROM lists WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
    async update(id, data) {
        const result = await pg_1.pool.query('UPDATE lists SET name = COALESCE($2, name) WHERE id = $1 RETURNING *', [id, data.name]);
        return result.rows[0] || null;
    },
    async delete(id) {
        const result = await pg_1.pool.query('DELETE FROM lists WHERE id = $1', [id]);
        return !!result.rowCount;
    },
};
exports.sqlTaskRepository = {
    async create(task) {
        const result = await pg_1.pool.query('INSERT INTO tasks (list_id, title, description, completed) VALUES ($1, $2, $3, $4) RETURNING *', [task.list_id, task.title, task.description, task.completed]);
        return result.rows[0];
    },
    async findByList(list_id) {
        const result = await pg_1.pool.query('SELECT * FROM tasks WHERE list_id = $1', [list_id]);
        return result.rows;
    },
    async findById(id) {
        const result = await pg_1.pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
        return result.rows[0] || null;
    },
    async update(id, data) {
        const result = await pg_1.pool.query('UPDATE tasks SET title = COALESCE($2, title), description = COALESCE($3, description), completed = COALESCE($4, completed) WHERE id = $1 RETURNING *', [id, data.title, data.description, data.completed]);
        return result.rows[0] || null;
    },
    async delete(id) {
        const result = await pg_1.pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        return !!result.rowCount;
    },
};
