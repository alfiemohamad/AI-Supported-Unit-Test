import { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

interface AddTaskFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    await onAdd(title, description);
    setTitle('');
    setDescription('');
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label="Task Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={loading}
        size="small"
        required
        sx={{ flex: 1, minWidth: 180 }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        disabled={loading}
        size="small"
        sx={{ flex: 2, minWidth: 220 }}
      />
      <Button type="submit" variant="contained" disabled={loading || !title.trim()}>
        {loading ? <CircularProgress size={20} /> : 'Add Task'}
      </Button>
    </Box>
  );
}
