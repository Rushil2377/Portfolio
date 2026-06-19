'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  authDialogOpen: boolean;
  authDialogMode: 'login' | 'register';
  login: (email: string, password: string) => Promise<{ success: boolean; requiresOtp?: boolean; error?: string }>;
  register: (email: string, password: string) => Promise<{ success: boolean; requiresOtp?: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string, type: 'register' | 'login') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  openAuthDialog: (mode?: 'login' | 'register') => void;
  setAuthDialogOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogMode, setAuthDialogMode] = useState<'login' | 'register'>('login');

  const openAuthDialog = (mode: 'login' | 'register' = 'login') => {
    setAuthDialogMode(mode);
    setAuthDialogOpen(true);
  };

  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Session check failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.requiresOtp) {
          return { success: true, requiresOtp: true };
        }
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to login' };
      }
    } catch (err: any) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        if (data.requiresOtp) {
          return { success: true, requiresOtp: true };
        }
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to register' };
      }
    } catch (err: any) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const verifyOtp = async (email: string, otp: string, type: 'register' | 'login') => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, type }),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Verification failed' };
      }
    } catch (err: any) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const value = {
    user,
    isAdmin: user?.role === 'admin',
    loading,
    authDialogOpen,
    authDialogMode,
    login,
    register,
    verifyOtp,
    logout,
    checkSession,
    openAuthDialog,
    setAuthDialogOpen,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
