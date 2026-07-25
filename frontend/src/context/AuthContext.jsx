import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../api/auth.api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => { loadUser(); }, []);

  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      if (token && userData) {
        const parsedUser = JSON.parse(userData);
        console.log('📥 Loaded user:', parsedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Load user error:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        const userData = {
          id: response.userId,
          fullName: response.user?.fullName || email.split('@')[0],
          email: email,
          phone: response.user?.phone || '',
          role: response.user?.role || 'customer',
          walletBalance: response.user?.walletBalance || 0,
        };
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error?.message || 'Login failed' };
    }
  };

  const verifyOTP = async (userId, otp) => {
    try {
      const response = await authAPI.verifyOTP(userId, otp);
      if (response.success) {
        const userData = {
          id: response.user.id || userId,
          fullName: response.user?.fullName || 'User',
          email: response.user?.email || '',
          phone: response.user?.phone || '',
          role: response.user?.role || 'customer',
          walletBalance: response.user?.walletBalance || 0,
        };
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };
      }
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: error?.message || 'Verification failed' };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ✅ switchRole — Force update
  const switchRole = async (role) => {
    try {
      console.log('🔄 Switching role to:', role);
      console.log('👤 Current user:', user);
      
      const updatedUser = { ...user, role };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      console.log('✅ Role switched to:', role);
      console.log('👤 Updated user:', updatedUser);
      
      return { success: true };
    } catch (error) {
      console.error('❌ Switch role error:', error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated, 
      login, 
      verifyOTP, 
      logout,
      switchRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export default AuthContext;
