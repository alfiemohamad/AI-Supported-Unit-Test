import type { List, Task } from '../../models/todo';

const lists: List[] = [];
const tasks: Task[] = [];

export const memoryListRepository = {
  async create(list: List) {
    if (!list.id) list.id = lists.length + 1;
    lists.push(list);
    return list;
  },
  async findByUser(user_id: number) {
    return lists.filter(l => l.user_id === user_id);
  },
  async findById(id: number) {
    return lists.find(l => l.id === id) || null;
  },
  async update(id: number, data: Partial<List>) {
    const idx = lists.findIndex(l => l.id === id);
    if (idx === -1) return null;
    lists[idx] = { ...lists[idx], ...data };
    return lists[idx];
  },
  async delete(id: number) {
    const idx = lists.findIndex(l => l.id === id);
    if (idx === -1) return false;
    lists.splice(idx, 1);
    return true;
  },
};

export const memoryTaskRepository = {
  async create(task: Task) {
    if (!task.id) task.id = tasks.length + 1;
    tasks.push(task);
    return task;
  },
  async findByList(list_id: number) {
    return tasks.filter(t => t.list_id === list_id);
  },
  async findById(id: number) {
    return tasks.find(t => t.id === id) || null;
  },
  async update(id: number, data: Partial<Task>) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tasks[idx] = { ...tasks[idx], ...data };
    return tasks[idx];
  },
  async delete(id: number) {
    const idx = tasks.findIndex(t => t.id === id);
    if (idx === -1) return false;
    tasks.splice(idx, 1);
    return true;
  },
};
