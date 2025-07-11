import { memoryTaskRepository } from '../repositories/memory/todoMemoryRepo';
import { sqlTaskRepository } from '../repositories/sql/todoSqlRepo';
import type { Task } from '../models/todo';

const isProduction = process.env.NODE_ENV === 'production';
const taskRepo = isProduction ? sqlTaskRepository : memoryTaskRepository;

export const taskService = {
  async createTask(task: Omit<Task, 'id'>): Promise<Task> {
    // @ts-ignore
    return taskRepo.create(task);
  },
  async getTasksByList(list_id: number): Promise<Task[]> {
    return taskRepo.findByList(list_id);
  },
  async getTaskById(id: number): Promise<Task | null> {
    return taskRepo.findById(id);
  },
  async updateTask(id: number, data: Partial<Task>): Promise<Task | null> {
    return taskRepo.update(id, data);
  },
  async deleteTask(id: number): Promise<boolean> {
    return taskRepo.delete(id);
  },
};
