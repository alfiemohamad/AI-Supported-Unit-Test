import { getToken } from './auth';

export interface TodoList {
  id: number;
  name: string;
  // Add more fields if needed
}

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  // Add more fields if needed
}

export async function fetchLists(): Promise<TodoList[]> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch lists');
  return res.json();
}

export async function createList(name: string): Promise<TodoList> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to create list');
  return res.json();
}

export async function updateList(id: number, name: string): Promise<TodoList> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to update list');
  return res.json();
}

export async function deleteList(id: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete list');
}

export async function fetchTasks(listId: number): Promise<Task[]> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists/${listId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function createTask(listId: number, title: string, description: string): Promise<Task> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/lists/${listId}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, completed: false }),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(taskId: number, updates: Partial<Task>): Promise<Task> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(taskId: number): Promise<void> {
  const token = getToken();
  const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Failed to delete task');
}
