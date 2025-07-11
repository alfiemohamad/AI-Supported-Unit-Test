import type { User } from '../../models/user';

const users: User[] = [];

export const memoryUserRepository = {
  async create(user: User) {
    users.push(user);
    return user;
  },
  async findByUsername(username: string) {
    return users.find(u => u.username === username) || null;
  },
  async findByEmail(email: string) {
    return this.users.find(u => u.email === email) || null;
  },
  async findById(id: number) {
    return users.find(u => u.id === id) || null;
  },
};
