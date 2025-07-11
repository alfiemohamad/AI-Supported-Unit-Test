"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const taskService_1 = require("./taskService");
const listService_1 = require("./listService");
describe('taskService (memory)', () => {
    let listId;
    let taskId;
    const userId = 54321;
    beforeAll(async () => {
        const list = await listService_1.listService.createList({ name: 'TaskService List', user_id: userId });
        listId = list.id;
    });
    it('should create task', async () => {
        const task = await taskService_1.taskService.createTask({ list_id: listId, title: 'Task1', description: 'desc', completed: false });
        expect(task).toHaveProperty('id');
        expect(task).toHaveProperty('title', 'Task1');
        taskId = task.id;
    });
    it('should get task by id', async () => {
        const task = await taskService_1.taskService.getTaskById(taskId);
        expect(task).not.toBeNull();
        expect(task?.id).toBe(taskId);
    });
    it('should get tasks by list', async () => {
        const tasks = await taskService_1.taskService.getTasksByList(listId);
        expect(Array.isArray(tasks)).toBe(true);
        expect(tasks.some(t => t.id === taskId)).toBe(true);
    });
    it('should update task', async () => {
        const updated = await taskService_1.taskService.updateTask(taskId, { title: 'Updated Task', completed: true });
        expect(updated).toHaveProperty('title', 'Updated Task');
        expect(updated).toHaveProperty('completed', true);
    });
    it('should delete task', async () => {
        const deleted = await taskService_1.taskService.deleteTask(taskId);
        expect(deleted).toBe(true);
        const task = await taskService_1.taskService.getTaskById(taskId);
        expect(task).toBeNull();
    });
});
