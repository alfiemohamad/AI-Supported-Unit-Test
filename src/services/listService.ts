import { memoryListRepository } from '../repositories/memory/todoMemoryRepo';
import { sqlListRepository } from '../repositories/sql/todoSqlRepo';
import type { List } from '../models/todo';

const isProduction = process.env.NODE_ENV === 'production';
const listRepo = isProduction ? sqlListRepository : memoryListRepository;

export const listService = {
  async createList(list: Omit<List, 'id'>): Promise<List> {
    // @ts-ignore
    return listRepo.create(list);
  },
  async getListsByUser(user_id: number): Promise<List[]> {
    return listRepo.findByUser(user_id);
  },
  async getListById(id: number): Promise<List | null> {
    return listRepo.findById(id);
  },
  async updateList(id: number, data: Partial<List>): Promise<List | null> {
    return listRepo.update(id, data);
  },
  async deleteList(id: number): Promise<boolean> {
    return listRepo.delete(id);
  },
};
