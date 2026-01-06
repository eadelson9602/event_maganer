import { useState } from 'react';
import { useAuth } from './useAuth';

export function useLoginForm() {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return {
    email,
    password,
    showPassword,
    isLoading,
    error,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
    clearError,
  };
}

