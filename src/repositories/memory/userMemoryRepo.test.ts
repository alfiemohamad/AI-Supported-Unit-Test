import { memoryUserRepository } from './userMemoryRepo';

describe('memoryUserRepository', () => {
  beforeEach(() => {
    // @ts-ignore
    memoryUserRepository['users'] = [];
  });

  it('should create a user', async () => {
    const user = { id: 1, username: 'user1', email: 'user1@email.com', password: 'pw' };
    const created = await memoryUserRepository.create(user as any);
    expect(created).toEqual(user);
  });

  it('should find user by username', async () => {
    const user = { id: 2, username: 'user2', email: 'user2@email.com', password: 'pw' };
    await memoryUserRepository.create(user as any);
    const found = await memoryUserRepository.findByUsername('user2');
    expect(found).not.toBeNull();
    expect(found?.email).toBe('user2@email.com');
  });

  it('should return null if username not found', async () => {
    const found = await memoryUserRepository.findByUsername('notfound');
    expect(found).toBeNull();
  });

  it('should find user by email', async () => {
    const user = { id: 3, username: 'user3', email: 'user3@email.com', password: 'pw' };
    await memoryUserRepository.create(user as any);
    const found = await memoryUserRepository.findByEmail('user3@email.com');
    expect(found).not.toBeNull();
    expect(found?.username).toBe('user3');
  });

  it('should return null if email not found', async () => {
    const found = await memoryUserRepository.findByEmail('notfound@email.com');
    expect(found).toBeNull();
  });

  it('should find user by id', async () => {
    const user = { id: 4, username: 'user4', email: 'user4@email.com', password: 'pw' };
    await memoryUserRepository.create(user as any);
    const found = await memoryUserRepository.findById(4);
    expect(found).not.toBeNull();
    expect(found?.username).toBe('user4');
  });

  it('should return null if id not found', async () => {
    const found = await memoryUserRepository.findById(999);
    expect(found).toBeNull();
  });
});
