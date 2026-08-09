import React, { createContext, useContext, useEffect } from 'react';
import useAuthStore from '../store/authStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    verifyOTP,
    logout,
    loadUser,
    updateUser,
  } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    verifyOTP,
    logout,
    loadUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
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

export default AuthContext;
