import { taskService } from './taskService';
import { listService } from './listService';

describe('taskService (memory)', () => {
  let listId: number;
  let taskId: number;
  const userId = 54321;

  beforeAll(async () => {
    const list = await listService.createList({ name: 'TaskService List', user_id: userId });
    listId = list.id;
  });

  it('should create task', async () => {
    const task = await taskService.createTask({ list_id: listId, title: 'Task1', description: 'desc', completed: false });
    expect(task).toHaveProperty('id');
    expect(task).toHaveProperty('title', 'Task1');
    taskId = task.id;
  });

  it('should get task by id', async () => {
    const task = await taskService.getTaskById(taskId);
    expect(task).not.toBeNull();
    expect(task?.id).toBe(taskId);
  });

  it('should get tasks by list', async () => {
    const tasks = await taskService.getTasksByList(listId);
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.some(t => t.id === taskId)).toBe(true);
  });

  it('should update task', async () => {
    const updated = await taskService.updateTask(taskId, { title: 'Updated Task', completed: true });
    expect(updated).toHaveProperty('title', 'Updated Task');
    expect(updated).toHaveProperty('completed', true);
  });

  it('should delete task', async () => {
    const deleted = await taskService.deleteTask(taskId);
    expect(deleted).toBe(true);
    const task = await taskService.getTaskById(taskId);
    expect(task).toBeNull();
  });
});
