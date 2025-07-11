import { useState } from 'react';
import { Box, TextField, Button, CircularProgress } from '@mui/material';

interface AddListFormProps {
  onAdd: (name: string) => Promise<void>;
}

export default function AddListForm({ onAdd }: AddListFormProps) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await onAdd(name);
    setName('');
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mb: 3 }}>
      <TextField
        label="New List Name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={loading}
        size="small"
        required
      />
      <Button type="submit" variant="contained" disabled={loading || !name.trim()}>
        {loading ? <CircularProgress size={20} /> : 'Add List'}
      </Button>
    </Box>
  );
}
