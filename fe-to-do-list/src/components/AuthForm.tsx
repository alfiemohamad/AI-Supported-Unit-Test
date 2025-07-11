import { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string, username?: string) => void;
  error?: string;
  loading?: boolean;
}

export default function AuthForm({ type, onSubmit, error, loading }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'register') {
      onSubmit(email, password, username);
    } else {
      onSubmit(email, password);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320, mx: 'auto', mt: 8 }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        {type === 'login' ? 'Login' : 'Register'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoFocus
        type="email"
      />
      {type === 'register' && (
        <TextField
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      )}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </Box>
  );
}
