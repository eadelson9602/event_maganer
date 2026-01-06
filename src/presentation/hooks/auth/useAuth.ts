import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../stores/auth.store';

export function useAuth() {
  const router = useRouter();
  const { isAuthenticated, isLoading, error, login, register, logout, clearError } = useAuthStore();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    clearError();
    try {
      await login(credentials);
      router.push('/events');
    } catch {
      // Error is handled by the store
    }
  };

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    clearError();
    try {
      await register(data);
      router.push('/login');
    } catch {
      // Error is handled by the store
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return {
    isAuthenticated,
    isLoading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    clearError,
  };
}

