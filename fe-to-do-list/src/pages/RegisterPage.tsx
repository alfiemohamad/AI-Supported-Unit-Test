import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string, username?: string) => {
    setLoading(true);
    setError(undefined);
    try {
      await register(email, password, username || '');
      navigate('/login');
    } catch (e) {
      setError((e as Error).message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} error={error} loading={loading} />;
}
