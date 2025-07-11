import { Router, Request, Response } from 'express';
import { listService } from '../services/listService';
import { taskService } from '../services/taskService';
import { authMiddleware } from '../utils/auth';

const router = Router();

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists for current user
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's lists
 *   post:
 *     summary: Create new list
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: List created
 */

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get list by ID
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List detail
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update list
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: List updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete list
 *     tags: [Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: List deleted
 *       404:
 *         description: Not found
 */

/**
 * @swagger
 * /lists/{listId}/tasks:
 *   get:
 *     summary: Get all tasks in a list
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of tasks
 *   post:
 *     summary: Create task in a list
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Task created
 */

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task detail
 *       404:
 *         description: Not found
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Task deleted
 *       404:
 *         description: Not found
 */

// All handlers must return void or Promise<void>
router.get('/lists', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const lists = await listService.getListsByUser(user.id);
  res.json(lists);
});

router.post('/lists', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  const list = await listService.createList({ user_id: user.id, name });
  res.status(201).json(list);
});

router.get('/lists/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const list = await listService.getListById(Number(req.params.id));
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(list);
});

router.put('/lists/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const list = await listService.getListById(Number(req.params.id));
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  const { name } = req.body;
  if (!name || typeof name !== 'string' || !name.trim()) {
    res.status(400).json({ error: 'Name is required' });
    return;
  }
  const updated = await listService.updateList(list.id, req.body);
  res.json(updated);
});

router.delete('/lists/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const list = await listService.getListById(Number(req.params.id));
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  await listService.deleteList(list.id);
  res.status(204).end();
});

// Tasks CRUD
router.get('/lists/:listId/tasks', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const list = await listService.getListById(Number(req.params.listId));
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  const tasks = await taskService.getTasksByList(list.id);
  res.json(tasks);
});

router.post('/lists/:listId/tasks', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const user = (req as any).user;
  const list = await listService.getListById(Number(req.params.listId));
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  const { title, description, completed } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  const task = await taskService.createTask({ list_id: list.id, title, description, completed: !!completed });
  res.status(201).json(task);
});

router.get('/tasks/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.getTaskById(Number(req.params.id));
  if (!task) { res.status(404).json({ error: 'Not found' }); return; }
  const list = await listService.getListById(task.list_id);
  const user = (req as any).user;
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  res.json(task);
});

router.put('/tasks/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.getTaskById(Number(req.params.id));
  if (!task) { res.status(404).json({ error: 'Not found' }); return; }
  const list = await listService.getListById(task.list_id);
  const user = (req as any).user;
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    res.status(400).json({ error: 'Title is required' });
    return;
  }
  const updated = await taskService.updateTask(task.id, req.body);
  res.json(updated);
});

router.delete('/tasks/:id', authMiddleware, async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.getTaskById(Number(req.params.id));
  if (!task) { res.status(404).json({ error: 'Not found' }); return; }
  const list = await listService.getListById(task.list_id);
  const user = (req as any).user;
  if (!list || list.user_id !== user.id) { res.status(404).json({ error: 'Not found' }); return; }
  await taskService.deleteTask(task.id);
  res.status(204).end();
});

export default router;
