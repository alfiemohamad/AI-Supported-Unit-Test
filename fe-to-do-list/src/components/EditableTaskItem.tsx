import { useState } from 'react';
import { ListItem, ListItemText, IconButton, TextField, Checkbox, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EditableTaskItemProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  onUpdate: (id: number, updates: { title?: string; description?: string }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onToggleComplete: (id: number, completed: boolean) => Promise<void>;
}

export default function EditableTaskItem({ id, title, description, completed, onUpdate, onDelete, onToggleComplete }: EditableTaskItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => { setEditing(false); setEditTitle(title); setEditDescription(description); };
  const handleSave = async () => {
    setLoading(true);
    await onUpdate(id, { title: editTitle, description: editDescription });
    setLoading(false);
    setEditing(false);
  };
  const handleDelete = async () => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  };
  const handleToggle = async () => {
    setLoading(true);
    await onToggleComplete(id, !completed);
    setLoading(false);
  };

  return (
    <ListItem
      secondaryAction={
        editing ? (
          <>
            <IconButton edge="end" onClick={handleSave} disabled={loading || !editTitle.trim()}>
              {loading ? <CircularProgress size={20} /> : <CheckIcon />}
            </IconButton>
            <IconButton edge="end" onClick={handleCancel} disabled={loading}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton edge="end" onClick={handleEdit}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" onClick={handleDelete} disabled={loading}>
              {loading ? <CircularProgress size={20} /> : <DeleteIcon />}
            </IconButton>
          </>
        )
      }
    >
      <Checkbox checked={completed} onChange={handleToggle} disabled={loading || editing} />
      {editing ? (
        <>
          <TextField
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
            size="small"
            required
            sx={{ mr: 1, minWidth: 120 }}
            disabled={loading}
          />
          <TextField
            value={editDescription}
            onChange={e => setEditDescription(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
            disabled={loading}
          />
        </>
      ) : (
        <ListItemText
          primary={title}
          secondary={description}
          sx={completed ? { textDecoration: 'line-through', color: 'text.secondary' } : {}}
        />
      )}
    </ListItem>
  );
}
