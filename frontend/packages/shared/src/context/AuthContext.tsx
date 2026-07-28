import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../api';
import { User } from '../types';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: any) => Promise<{ success: boolean; message?: string; userId?: string }>;
  verifyOTP: (userId: string, otp: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: string) => Promise<{ success: boolean }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        const userData = {
          id: response.data.userId,
          fullName: response.data.user?.fullName || email.split('@')[0],
          email,
          role: response.data.user?.role || 'customer',
        };
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setToken(response.data.token);
        setUser(userData as User);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authAPI.register(data);
      if (response.success) {
        return { success: true, userId: response.data.userId };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'Registration failed' };
    }
  };

  const verifyOTP = async (userId: string, otp: string) => {
    try {
      const response = await authAPI.verifyOTP(userId, otp);
      if (response.success) {
        const userData = response.data.user;
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userData', JSON.stringify(userData));
        setToken(response.data.token);
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error: any) {
      return { success: false, message: error.message || 'OTP verification failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const switchRole = async (role: string) => {
    try {
      const updatedUser = { ...user, role } as User;
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        register,
        verifyOTP,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
