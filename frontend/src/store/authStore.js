import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authAPI from '../api/auth.api';  // ✅ Correct path (lowercase)

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  // Actions
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true };
      }
      set({ isLoading: false });
      return { success: false, message: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.register(userData);
      if (response.success) {
        set({ isLoading: false });
        return { success: true, userId: response.userId };
      }
      set({ isLoading: false });
      return { success: false, message: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  verifyOTP: async (userId, otp) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.verifyOTP(userId, otp);
      if (response.success) {
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.user));
        set({
          user: response.user,
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        });
        return { success: true };
      }
      set({ isLoading: false });
      return { success: false, message: response.message };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message };
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('userData');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('authToken');
      const userData = await AsyncStorage.getItem('userData');
      if (token && userData) {
        set({
          token,
          user: JSON.parse(userData),
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },

  updateUser: (data) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      set({ user: updatedUser });
      AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  },

  // Getters
  getUser: () => get().user,
  getToken: () => get().token,
  isAuthenticated: () => get().isAuthenticated,
  isLoading: () => get().isLoading,
}));

export default useAuthStore;
