"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoSqlRepo_1 = require("./todoSqlRepo");
const pg_1 = require("./pg");
describe('sqlListRepository', () => {
    let listId;
    const userId = 99999;
    beforeAll(async () => {
        // Insert dummy user for foreign key
        await pg_1.pool.query(`INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`, [userId, 'sqltestuser', 'sqltestuser@example.com', 'dummyhash']);
    });
    afterAll(async () => {
        await pg_1.pool.query('DELETE FROM lists WHERE user_id = $1', [userId]);
        await pg_1.pool.query('DELETE FROM users WHERE id = $1', [userId]);
    });
    it('should create list', async () => {
        const list = await todoSqlRepo_1.sqlListRepository.create({ user_id: userId, name: 'SQL List' });
        expect(list).toHaveProperty('id');
        expect(list).toHaveProperty('name', 'SQL List');
        expect(list).toHaveProperty('user_id', userId);
        listId = list.id;
    });
    it('should find by user', async () => {
        const lists = await todoSqlRepo_1.sqlListRepository.findByUser(userId);
        expect(Array.isArray(lists)).toBe(true);
        expect(lists.some(l => l.id === listId)).toBe(true);
    });
    it('should find by id', async () => {
        const list = await todoSqlRepo_1.sqlListRepository.findById(listId);
        expect(list).not.toBeNull();
        expect(list?.id).toBe(listId);
    });
    it('should update list', async () => {
        const updated = await todoSqlRepo_1.sqlListRepository.update(listId, { name: 'Updated SQL List' });
        expect(updated).not.toBeNull();
        expect(updated?.name).toBe('Updated SQL List');
    });
    it('should delete list', async () => {
        const deleted = await todoSqlRepo_1.sqlListRepository.delete(listId);
        expect(deleted).toBe(true);
        const notFound = await todoSqlRepo_1.sqlListRepository.findById(listId);
        expect(notFound).toBeNull();
    });
    it('should return null/false for not found', async () => {
        expect(await todoSqlRepo_1.sqlListRepository.findById(9999999)).toBeNull();
        expect(await todoSqlRepo_1.sqlListRepository.update(9999999, { name: 'x' })).toBeNull();
        expect(await todoSqlRepo_1.sqlListRepository.delete(9999999)).toBe(false);
    });
});
describe('sqlTaskRepository', () => {
    let listId;
    let taskId;
    const userId = 88888;
    beforeAll(async () => {
        // Insert dummy user for foreign key
        await pg_1.pool.query(`INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`, [userId, 'sqltestuser2', 'sqltestuser2@example.com', 'dummyhash']);
        const list = await todoSqlRepo_1.sqlListRepository.create({ user_id: userId, name: 'TaskList' });
        listId = list.id;
    });
    afterAll(async () => {
        await pg_1.pool.query('DELETE FROM tasks WHERE list_id = $1', [listId]);
        await pg_1.pool.query('DELETE FROM lists WHERE id = $1', [listId]);
        await pg_1.pool.query('DELETE FROM users WHERE id = $1', [userId]);
        await pg_1.pool.end();
    });
    it('should create task', async () => {
        const task = await todoSqlRepo_1.sqlTaskRepository.create({ list_id: listId, title: 'Task', description: 'desc', completed: false });
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title', 'Task');
        taskId = task.id;
    });
    it('should find by list', async () => {
        const tasks = await todoSqlRepo_1.sqlTaskRepository.findByList(listId);
        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.some(t => t.id === taskId)).toBe(true);
    });
    it('should find by id', async () => {
        const task = await todoSqlRepo_1.sqlTaskRepository.findById(taskId);
        expect(task).not.toBeNull();
        expect(task?.id).toBe(taskId);
    });
    it('should update task', async () => {
        const updated = await todoSqlRepo_1.sqlTaskRepository.update(taskId, { title: 'Updated Task', completed: true });
        expect(updated).not.toBeNull();
        expect(updated?.title).toBe('Updated Task');
        expect(updated?.completed).toBe(true);
    });
    it('should delete task', async () => {
        const deleted = await todoSqlRepo_1.sqlTaskRepository.delete(taskId);
        expect(deleted).toBe(true);
        const notFound = await todoSqlRepo_1.sqlTaskRepository.findById(taskId);
        expect(notFound).toBeNull();
    });
    it('should return null/false for not found', async () => {
        expect(await todoSqlRepo_1.sqlTaskRepository.findById(9999999)).toBeNull();
        expect(await todoSqlRepo_1.sqlTaskRepository.update(9999999, { title: 'x' })).toBeNull();
        expect(await todoSqlRepo_1.sqlTaskRepository.delete(9999999)).toBe(false);
    });
});
