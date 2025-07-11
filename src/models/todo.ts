export interface List {
  id: number;
  user_id: number;
  name: string;
  created_at?: Date;
}

export interface Task {
  id: number;
  list_id: number;
  title: string;
  description?: string;
  completed: boolean;
  created_at?: Date;
}
