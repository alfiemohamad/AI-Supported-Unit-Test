import { sqlListRepository, sqlTaskRepository } from './todoSqlRepo';
import { pool } from './pg';

describe('sqlListRepository', () => {
  let listId: number;
  const userId = 99999;

  beforeAll(async () => {
    // Insert dummy user for foreign key
    await pool.query(
      `INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
      [userId, 'sqltestuser', 'sqltestuser@example.com', 'dummyhash']
    );
  });

  afterAll(async () => {
    await pool.query('DELETE FROM lists WHERE user_id = $1', [userId]);
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  });

  it('should create list', async () => {
    const list = await sqlListRepository.create({ user_id: userId, name: 'SQL List' });
    expect(list).toHaveProperty('id');
    expect(list).toHaveProperty('name', 'SQL List');
    expect(list).toHaveProperty('user_id', userId);
    listId = list.id;
  });

  it('should find by user', async () => {
    const lists = await sqlListRepository.findByUser(userId);
    expect(Array.isArray(lists)).toBe(true);
    expect(lists.some(l => l.id === listId)).toBe(true);
  });

  it('should find by id', async () => {
    const list = await sqlListRepository.findById(listId);
    expect(list).not.toBeNull();
    expect(list?.id).toBe(listId);
  });

  it('should update list', async () => {
    const updated = await sqlListRepository.update(listId, { name: 'Updated SQL List' });
    expect(updated).not.toBeNull();
    expect(updated?.name).toBe('Updated SQL List');
  });

  it('should delete list', async () => {
    const deleted = await sqlListRepository.delete(listId);
    expect(deleted).toBe(true);
    const notFound = await sqlListRepository.findById(listId);
    expect(notFound).toBeNull();
  });

  it('should return null/false for not found', async () => {
    expect(await sqlListRepository.findById(9999999)).toBeNull();
    expect(await sqlListRepository.update(9999999, { name: 'x' })).toBeNull();
    expect(await sqlListRepository.delete(9999999)).toBe(false);
  });
});

describe('sqlTaskRepository', () => {
  let listId: number;
  let taskId: number;
  const userId = 88888;

  beforeAll(async () => {
    // Insert dummy user for foreign key
    await pool.query(
      `INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING`,
      [userId, 'sqltestuser2', 'sqltestuser2@example.com', 'dummyhash']
    );
    const list = await sqlListRepository.create({ user_id: userId, name: 'TaskList' });
    listId = list.id;
  });
  afterAll(async () => {
    await pool.query('DELETE FROM tasks WHERE list_id = $1', [listId]);
    await pool.query('DELETE FROM lists WHERE id = $1', [listId]);
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    await pool.end();
  });

  it('should create task', async () => {
    const task = await sqlTaskRepository.create({ list_id: listId, title: 'Task', description: 'desc', completed: false });
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Task');
    taskId = task.id;
  });

  it('should find by list', async () => {
    const tasks = await sqlTaskRepository.findByList(listId);
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.some(t => t.id === taskId)).toBe(true);
  });

  it('should find by id', async () => {
    const task = await sqlTaskRepository.findById(taskId);
    expect(task).not.toBeNull();
    expect(task?.id).toBe(taskId);
  });

  it('should update task', async () => {
    const updated = await sqlTaskRepository.update(taskId, { title: 'Updated Task', completed: true });
    expect(updated).not.toBeNull();
    expect(updated?.title).toBe('Updated Task');
    expect(updated?.completed).toBe(true);
  });

  it('should delete task', async () => {
    const deleted = await sqlTaskRepository.delete(taskId);
    expect(deleted).toBe(true);
    const notFound = await sqlTaskRepository.findById(taskId);
    expect(notFound).toBeNull();
  });

  it('should return null/false for not found', async () => {
    expect(await sqlTaskRepository.findById(9999999)).toBeNull();
    expect(await sqlTaskRepository.update(9999999, { title: 'x' })).toBeNull();
    expect(await sqlTaskRepository.delete(9999999)).toBe(false);
  });
});
