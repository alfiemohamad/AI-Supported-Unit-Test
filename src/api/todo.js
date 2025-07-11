"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listService_1 = require("../services/listService");
const taskService_1 = require("../services/taskService");
const auth_1 = require("../utils/auth");
const router = (0, express_1.Router)();
// All handlers must return void or Promise<void>
router.get('/lists', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const lists = await listService_1.listService.getListsByUser(user.id);
    res.json(lists);
});
router.post('/lists', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const { name } = req.body;
    const list = await listService_1.listService.createList({ user_id: user.id, name });
    res.status(201).json(list);
});
router.get('/lists/:id', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const list = await listService_1.listService.getListById(Number(req.params.id));
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json(list);
});
router.put('/lists/:id', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const list = await listService_1.listService.getListById(Number(req.params.id));
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const updated = await listService_1.listService.updateList(list.id, req.body);
    res.json(updated);
});
router.delete('/lists/:id', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const list = await listService_1.listService.getListById(Number(req.params.id));
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    await listService_1.listService.deleteList(list.id);
    res.status(204).end();
});
// Tasks CRUD
router.get('/lists/:listId/tasks', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const list = await listService_1.listService.getListById(Number(req.params.listId));
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const tasks = await taskService_1.taskService.getTasksByList(list.id);
    res.json(tasks);
});
router.post('/lists/:listId/tasks', auth_1.authMiddleware, async (req, res) => {
    const user = req.user;
    const list = await listService_1.listService.getListById(Number(req.params.listId));
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const { title, description, completed } = req.body;
    const task = await taskService_1.taskService.createTask({ list_id: list.id, title, description, completed: !!completed });
    res.status(201).json(task);
});
router.get('/tasks/:id', auth_1.authMiddleware, async (req, res) => {
    const task = await taskService_1.taskService.getTaskById(Number(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const list = await listService_1.listService.getListById(task.list_id);
    const user = req.user;
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    res.json(task);
});
router.put('/tasks/:id', auth_1.authMiddleware, async (req, res) => {
    const task = await taskService_1.taskService.getTaskById(Number(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const list = await listService_1.listService.getListById(task.list_id);
    const user = req.user;
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const updated = await taskService_1.taskService.updateTask(task.id, req.body);
    res.json(updated);
});
router.delete('/tasks/:id', auth_1.authMiddleware, async (req, res) => {
    const task = await taskService_1.taskService.getTaskById(Number(req.params.id));
    if (!task) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    const list = await listService_1.listService.getListById(task.list_id);
    const user = req.user;
    if (!list || list.user_id !== user.id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }
    await taskService_1.taskService.deleteTask(task.id);
    res.status(204).end();
});
exports.default = router;
