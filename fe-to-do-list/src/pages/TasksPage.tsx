import { useEffect, useState } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/lists';
import type { Task } from '../api/lists';
import { List, Typography, CircularProgress, Alert, Box } from '@mui/material';
import AddTaskForm from '../components/AddTaskForm';
import EditableTaskItem from '../components/EditableTaskItem';

interface TasksPageProps {
  listId: number;
  listName: string;
}

export default function TasksPage({ listId, listName }: TasksPageProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [addError, setAddError] = useState<string | undefined>();

  useEffect(() => {
    fetchTasks(listId)
      .then(setTasks)
      .catch(e => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [listId]);

  const handleAddTask = async (title: string, description: string) => {
    setAddError(undefined);
    try {
      const newTask = await createTask(listId, title, description);
      setTasks(tasks => [...tasks, newTask]);
    } catch (e) {
      setAddError((e as Error).message || 'Failed to add task');
    }
  };

  const handleUpdateTask = async (id: number, updates: { title?: string; description?: string }) => {
    const updated = await updateTask(id, updates);
    setTasks(tasks => tasks.map(t => (t.id === id ? updated : t)));
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks => tasks.filter(t => t.id !== id));
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    const updated = await updateTask(id, { completed });
    setTasks(tasks => tasks.map(t => (t.id === id ? updated : t)));
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>{listName} - Tasks</Typography>
      <AddTaskForm onAdd={handleAddTask} />
      {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
      {tasks.length === 0 ? (
        <Typography color="text.secondary">No tasks found.</Typography>
      ) : (
        <List>
          {tasks.map(task => (
            <EditableTaskItem
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </List>
      )}
    </Box>
  );
}
