"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoMemoryRepo_1 = require("./todoMemoryRepo");
describe('memoryListRepository', () => {
    beforeEach(() => {
        // @ts-ignore
        todoMemoryRepo_1.memoryListRepository['lists'] = [];
    });
    it('should create a list with auto id', async () => {
        const list = await todoMemoryRepo_1.memoryListRepository.create({ user_id: 1, name: 'A' });
        expect(list.id).toBeDefined();
        expect(list.name).toBe('A');
    });
    it('should find lists by user', async () => {
        await todoMemoryRepo_1.memoryListRepository.create({ user_id: 2, name: 'B' });
        const lists = await todoMemoryRepo_1.memoryListRepository.findByUser(2);
        expect(lists.length).toBeGreaterThan(0);
    });
    it('should find list by id', async () => {
        const l = await todoMemoryRepo_1.memoryListRepository.create({ user_id: 3, name: 'C' });
        const found = await todoMemoryRepo_1.memoryListRepository.findById(l.id);
        expect(found).not.toBeNull();
    });
    it('should update list', async () => {
        const l = await todoMemoryRepo_1.memoryListRepository.create({ user_id: 4, name: 'D' });
        const updated = await todoMemoryRepo_1.memoryListRepository.update(l.id, { name: 'E' });
        expect(updated?.name).toBe('E');
    });
    it('should return null if update not found', async () => {
        const updated = await todoMemoryRepo_1.memoryListRepository.update(999, { name: 'X' });
        expect(updated).toBeNull();
    });
    it('should delete list', async () => {
        const l = await todoMemoryRepo_1.memoryListRepository.create({ user_id: 5, name: 'F' });
        const deleted = await todoMemoryRepo_1.memoryListRepository.delete(l.id);
        expect(deleted).toBe(true);
    });
    it('should return false if delete not found', async () => {
        const deleted = await todoMemoryRepo_1.memoryListRepository.delete(999);
        expect(deleted).toBe(false);
    });
});
describe('memoryTaskRepository', () => {
    beforeEach(() => {
        // @ts-ignore
        todoMemoryRepo_1.memoryTaskRepository['tasks'] = [];
    });
    it('should create a task with auto id', async () => {
        const task = await todoMemoryRepo_1.memoryTaskRepository.create({ list_id: 1, title: 'T', description: '', completed: false });
        expect(task.id).toBeDefined();
        expect(task.title).toBe('T');
    });
    it('should find tasks by list', async () => {
        await todoMemoryRepo_1.memoryTaskRepository.create({ list_id: 2, title: 'T2', description: '', completed: false });
        const tasks = await todoMemoryRepo_1.memoryTaskRepository.findByList(2);
        expect(tasks.length).toBeGreaterThan(0);
    });
    it('should find task by id', async () => {
        const t = await todoMemoryRepo_1.memoryTaskRepository.create({ list_id: 3, title: 'T3', description: '', completed: false });
        const found = await todoMemoryRepo_1.memoryTaskRepository.findById(t.id);
        expect(found).not.toBeNull();
    });
    it('should update task', async () => {
        const t = await todoMemoryRepo_1.memoryTaskRepository.create({ list_id: 4, title: 'T4', description: '', completed: false });
        const updated = await todoMemoryRepo_1.memoryTaskRepository.update(t.id, { title: 'T4-upd' });
        expect(updated?.title).toBe('T4-upd');
    });
    it('should return null if update not found', async () => {
        const updated = await todoMemoryRepo_1.memoryTaskRepository.update(999, { title: 'X' });
        expect(updated).toBeNull();
    });
    it('should delete task', async () => {
        const t = await todoMemoryRepo_1.memoryTaskRepository.create({ list_id: 5, title: 'T5', description: '', completed: false });
        const deleted = await todoMemoryRepo_1.memoryTaskRepository.delete(t.id);
        expect(deleted).toBe(true);
    });
    it('should return false if delete not found', async () => {
        const deleted = await todoMemoryRepo_1.memoryTaskRepository.delete(999);
        expect(deleted).toBe(false);
    });
});
