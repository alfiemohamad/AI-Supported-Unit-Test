import { useState } from 'react';
import { IconButton, TextField, ListItem, ListItemText, ListItemSecondaryAction, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface EditableListItemProps {
  id: number;
  name: string;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export default function EditableListItem({ id, name, onUpdate, onDelete }: EditableListItemProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [loading, setLoading] = useState(false);

  const handleEdit = () => setEditing(true);
  const handleCancel = () => { setEditing(false); setValue(name); };
  const handleSave = async () => {
    setLoading(true);
    await onUpdate(id, value);
    setLoading(false);
    setEditing(false);
  };
  const handleDelete = async () => {
    setLoading(true);
    await onDelete(id);
    setLoading(false);
  };

  return (
    <ListItem
      secondaryAction={
        editing ? (
          <>
            <IconButton edge="end" onClick={handleSave} disabled={loading || !value.trim()}>
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
      {editing ? (
        <TextField
          value={value}
          onChange={e => setValue(e.target.value)}
          size="small"
          autoFocus
          disabled={loading}
        />
      ) : (
        <ListItemText primary={name} />
      )}
    </ListItem>
  );
}
