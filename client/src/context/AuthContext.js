'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, setUser, clearUser } from '@/lib/auth';
import api from '@/lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getUser();
    if (stored) setUserState(stored);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/api/auth/login', { email, password });

    // store user using helper
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const register = async (username, email, password) => {
    const { data } = await api.post('/api/auth/register', {
      username,
      email,
      password,
    });

    
    setUser(data.user);
    setUserState(data.user);

    return data.user;
  };

  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (_) {}

    clearUser();
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};