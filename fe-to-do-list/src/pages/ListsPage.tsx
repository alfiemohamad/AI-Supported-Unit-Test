import { useEffect, useState } from 'react';
import { fetchLists, createList, updateList, deleteList } from '../api/lists';
import type { TodoList } from '../api/lists';
import { List, Typography, CircularProgress, Alert, Box } from '@mui/material';
import AddListForm from '../components/AddListForm';
import EditableListItem from '../components/EditableListItem';
import TasksPage from './TasksPage';

export default function ListsPage() {
  const [lists, setLists] = useState<TodoList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [addError, setAddError] = useState<string | undefined>();
  const [selectedList, setSelectedList] = useState<TodoList | null>(null);

  useEffect(() => {
    fetchLists()
      .then(setLists)
      .catch(e => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddList = async (name: string) => {
    setAddError(undefined);
    try {
      const newList = await createList(name);
      setLists(lists => [...lists, newList]);
    } catch (e) {
      setAddError((e as Error).message || 'Failed to add list');
    }
  };

  const handleUpdateList = async (id: number, name: string) => {
    const updated = await updateList(id, name);
    setLists(lists => lists.map(l => (l.id === id ? updated : l)));
  };

  const handleDeleteList = async (id: number) => {
    await deleteList(id);
    setLists(lists => lists.filter(l => l.id !== id));
    if (selectedList && selectedList.id === id) setSelectedList(null);
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (selectedList) {
    return <TasksPage listId={selectedList.id} listName={selectedList.name} />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>My Lists</Typography>
      <AddListForm onAdd={handleAddList} />
      {addError && <Alert severity="error" sx={{ mb: 2 }}>{addError}</Alert>}
      {lists.length === 0 ? (
        <Typography color="text.secondary">No lists found.</Typography>
      ) : (
        <List>
          {lists.map(list => (
            <div key={list.id} onClick={() => setSelectedList(list)} style={{ cursor: 'pointer' }}>
              <EditableListItem
                id={list.id}
                name={list.name}
                onUpdate={handleUpdateList}
                onDelete={handleDeleteList}
              />
            </div>
          ))}
        </List>
      )}
    </Box>
  );
}
