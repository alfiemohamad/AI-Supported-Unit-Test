import { pool } from './pg';
import type { List, Task } from '../../models/todo';

export const sqlListRepository = {
  async create(list: Omit<List, 'id'>): Promise<List> {
    const result = await pool.query(
      'INSERT INTO lists (user_id, name) VALUES ($1, $2) RETURNING *',
      [list.user_id, list.name]
    );
    return result.rows[0];
  },
  async findByUser(user_id: number): Promise<List[]> {
    const result = await pool.query('SELECT * FROM lists WHERE user_id = $1', [user_id]);
    return result.rows;
  },
  async findById(id: number): Promise<List | null> {
    const result = await pool.query('SELECT * FROM lists WHERE id = $1', [id]);
    return result.rows[0] || null;
  },
  async update(id: number, data: Partial<List>): Promise<List | null> {
    const result = await pool.query(
      'UPDATE lists SET name = COALESCE($2, name) WHERE id = $1 RETURNING *',
      [id, data.name]
    );
    return result.rows[0] || null;
  },
  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM lists WHERE id = $1', [id]);
    return !!result.rowCount;
  },
};

export const sqlTaskRepository = {
  async create(task: Omit<Task, 'id'>): Promise<Task> {
    const result = await pool.query(
      'INSERT INTO tasks (list_id, title, description, completed) VALUES ($1, $2, $3, $4) RETURNING *',
      [task.list_id, task.title, task.description, task.completed]
    );
    return result.rows[0];
  },
  async findByList(list_id: number): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks WHERE list_id = $1', [list_id]);
    return result.rows;
  },
  async findById(id: number): Promise<Task | null> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  },
  async update(id: number, data: Partial<Task>): Promise<Task | null> {
    const result = await pool.query(
      'UPDATE tasks SET title = COALESCE($2, title), description = COALESCE($3, description), completed = COALESCE($4, completed) WHERE id = $1 RETURNING *',
      [id, data.title, data.description, data.completed]
    );
    return result.rows[0] || null;
  },
  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return !!result.rowCount;
  },
};
