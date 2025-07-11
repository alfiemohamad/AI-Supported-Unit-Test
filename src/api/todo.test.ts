import request from 'supertest';
import express from 'express';
import todoRouter from './todo';
import authRouter from './auth';
import { pool } from '../repositories/sql/pg';

describe('Todo API', () => {
  const app = express();
  app.use(express.json());
  app.use('/auth', authRouter);
  app.use(todoRouter); // Mount tanpa prefix agar semua endpoint router bisa diakses langsung

  let token: string;
  let listId: number;
  let taskId: number;

  const testUser = {
    username: 'apitestuser',
    email: 'apitestuser@example.com',
    password: 'apitestpass',
  };

  beforeAll(async () => {
    await request(app).post('/auth/register').send(testUser);
    const res = await request(app).post('/auth/login').send({ email: testUser.email, password: testUser.password });
    token = res.body.token;
  });

  afterAll(async () => {
    await pool.query('DELETE FROM users WHERE email = $1', [testUser.email]);
    await pool.end();
  });

  it('should create a new list', async () => {
    const res = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'My List' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('name', 'My List');
    listId = res.body.id;
  });

  it('should get all lists for user', async () => {
    const res = await request(app)
      .get('/lists')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((l: any) => l.id === listId)).toBe(true);
  });

  it('should get list by id', async () => {
    const res = await request(app)
      .get(`/lists/${listId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', listId);
  });

  it('should update list', async () => {
    const res = await request(app)
      .put(`/lists/${listId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated List' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Updated List');
  });

  it('should delete list', async () => {
    const res = await request(app)
      .delete(`/lists/${listId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('should return 401 if no token', async () => {
    const res = await request(app).get('/lists');
    expect(res.status).toBe(401);
  });

  it('should return 404 for non-existent list', async () => {
    const res = await request(app)
      .get('/lists/999999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('should create a new task in list', async () => {
    // Buat list baru untuk task
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Task List' });
    const newListId = listRes.body.id;
    const res = await request(app)
      .post(`/lists/${newListId}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'My Task', description: 'desc', completed: false });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('title', 'My Task');
    taskId = res.body.id;
  });

  it('should get all tasks in a list', async () => {
    // Cari list id dari task sebelumnya
    const listsRes = await request(app)
      .get('/lists')
      .set('Authorization', `Bearer ${token}`);
    const list = listsRes.body.find((l: any) => l.name === 'Task List');
    const res = await request(app)
      .get(`/lists/${list.id}/tasks`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some((t: any) => t.id === taskId)).toBe(true);
  });

  it('should get task by id', async () => {
    const res = await request(app)
      .get(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', taskId);
  });

  it('should update task', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Task', completed: true });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Updated Task');
    expect(res.body).toHaveProperty('completed', true);
  });

  it('should delete task', async () => {
    const res = await request(app)
      .delete(`/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for non-existent task', async () => {
    const res = await request(app)
      .get('/tasks/999999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(404);
  });

  it('should return 401 if create task without token', async () => {
    // Cari list id
    const listsRes = await request(app)
      .get('/lists')
      .set('Authorization', `Bearer ${token}`);
    const list = listsRes.body[0];
    const res = await request(app)
      .post(`/lists/${list.id}/tasks`)
      .send({ title: 'No Token', description: '', completed: false });
    expect(res.status).toBe(401);
  });

  it('should return 400 if create list with missing name', async () => {
    const res = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if update list with missing name', async () => {
    // Buat list baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Update' });
    const updateRes = await request(app)
      .put(`/lists/${listRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(updateRes.status).toBe(400);
    expect(updateRes.body).toHaveProperty('error');
  });

  it('should return 400 if create task with missing fields', async () => {
    // Buat list baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task Error' });
    const res = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if update task with missing fields', async () => {
    // Buat list dan task baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task Update' });
    const taskRes = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task', description: 'desc', completed: false });
    const res = await request(app)
      .put(`/tasks/${taskRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 401 if update list without token', async () => {
    // Buat list baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For 401' });
    const res = await request(app)
      .put(`/lists/${listRes.body.id}`)
      .send({ name: 'No Token' });
    expect(res.status).toBe(401);
  });

  it('should return 401 if delete list without token', async () => {
    // Buat list baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For 401 Delete' });
    const res = await request(app)
      .delete(`/lists/${listRes.body.id}`);
    expect(res.status).toBe(401);
  });

  it('should return 401 if update task without token', async () => {
    // Buat list dan task baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task 401' });
    const taskRes = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task', description: 'desc', completed: false });
    const res = await request(app)
      .put(`/tasks/${taskRes.body.id}`)
      .send({ title: 'No Token', completed: true });
    expect(res.status).toBe(401);
  });

  it('should return 401 if delete task without token', async () => {
    // Buat list dan task baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task 401 Delete' });
    const taskRes = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task', description: 'desc', completed: false });
    const res = await request(app)
      .delete(`/tasks/${taskRes.body.id}`);
    expect(res.status).toBe(401);
  });

  it('should return 401 if get tasks in list without token', async () => {
    // Buat list baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task 401 Get' });
    const res = await request(app)
      .get(`/lists/${listRes.body.id}/tasks`);
    expect(res.status).toBe(401);
  });

  it('should return 401 if get task by id without token', async () => {
    // Buat list dan task baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task 401 Get By Id' });
    const taskRes = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task', description: 'desc', completed: false });
    const res = await request(app)
      .get(`/tasks/${taskRes.body.id}`);
    expect(res.status).toBe(401);
  });

  it('should return 401 if update task without token', async () => {
    // Buat list dan task baru
    const listRes = await request(app)
      .post('/lists')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'List For Task 401 Update' });
    const taskRes = await request(app)
      .post(`/lists/${listRes.body.id}/tasks`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Task', description: 'desc', completed: false });
    const res = await request(app)
      .put(`/tasks/${taskRes.body.id}`)
      .send({ title: 'No Token', completed: true });
    expect(res.status).toBe(401);
  });
});
