import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

interface AuthResponse {
  token: string;
}

const useAuth = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = async (username: string, password: string): Promise<void> => {
    try {
      // Assuming authService.login returns an object with a token
      const response: AuthResponse = await authService.login(username, password);
      localStorage.setItem('token', response.token);
      setToken(response.token);
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const isAuthenticated = (): boolean => {
    return !!token;
  };

  return { login, logout, isAuthenticated };
};

export default useAuth;
