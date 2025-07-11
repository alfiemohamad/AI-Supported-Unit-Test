import { memoryListRepository, memoryTaskRepository } from './todoMemoryRepo';

describe('memoryListRepository', () => {
  beforeEach(() => {
    // @ts-ignore
    memoryListRepository['lists'] = [];
  });

  it('should create a list with auto id', async () => {
    const list = await memoryListRepository.create({ user_id: 1, name: 'A' } as any);
    expect(list.id).toBeDefined();
    expect(list.name).toBe('A');
  });

  it('should find lists by user', async () => {
    await memoryListRepository.create({ user_id: 2, name: 'B' } as any);
    const lists = await memoryListRepository.findByUser(2);
    expect(lists.length).toBeGreaterThan(0);
  });

  it('should find list by id', async () => {
    const l = await memoryListRepository.create({ user_id: 3, name: 'C' } as any);
    const found = await memoryListRepository.findById(l.id);
    expect(found).not.toBeNull();
  });

  it('should update list', async () => {
    const l = await memoryListRepository.create({ user_id: 4, name: 'D' } as any);
    const updated = await memoryListRepository.update(l.id, { name: 'E' });
    expect(updated?.name).toBe('E');
  });

  it('should return null if update not found', async () => {
    const updated = await memoryListRepository.update(999, { name: 'X' });
    expect(updated).toBeNull();
  });

  it('should delete list', async () => {
    const l = await memoryListRepository.create({ user_id: 5, name: 'F' } as any);
    const deleted = await memoryListRepository.delete(l.id);
    expect(deleted).toBe(true);
  });

  it('should return false if delete not found', async () => {
    const deleted = await memoryListRepository.delete(999);
    expect(deleted).toBe(false);
  });
});

describe('memoryTaskRepository', () => {
  beforeEach(() => {
    // @ts-ignore
    memoryTaskRepository['tasks'] = [];
  });

  it('should create a task with auto id', async () => {
    const task = await memoryTaskRepository.create({ list_id: 1, title: 'T', description: '', completed: false } as any);
    expect(task.id).toBeDefined();
    expect(task.title).toBe('T');
  });

  it('should find tasks by list', async () => {
    await memoryTaskRepository.create({ list_id: 2, title: 'T2', description: '', completed: false } as any);
    const tasks = await memoryTaskRepository.findByList(2);
    expect(tasks.length).toBeGreaterThan(0);
  });

  it('should find task by id', async () => {
    const t = await memoryTaskRepository.create({ list_id: 3, title: 'T3', description: '', completed: false } as any);
    const found = await memoryTaskRepository.findById(t.id);
    expect(found).not.toBeNull();
  });

  it('should update task', async () => {
    const t = await memoryTaskRepository.create({ list_id: 4, title: 'T4', description: '', completed: false } as any);
    const updated = await memoryTaskRepository.update(t.id, { title: 'T4-upd' });
    expect(updated?.title).toBe('T4-upd');
  });

  it('should return null if update not found', async () => {
    const updated = await memoryTaskRepository.update(999, { title: 'X' });
    expect(updated).toBeNull();
  });

  it('should delete task', async () => {
    const t = await memoryTaskRepository.create({ list_id: 5, title: 'T5', description: '', completed: false } as any);
    const deleted = await memoryTaskRepository.delete(t.id);
    expect(deleted).toBe(true);
  });

  it('should return false if delete not found', async () => {
    const deleted = await memoryTaskRepository.delete(999);
    expect(deleted).toBe(false);
  });
});
