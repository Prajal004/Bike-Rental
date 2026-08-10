import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth';

const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        // ✅ Login ma role store
        const userData = {
          id: response.userId,
          email: email,
          role: response.user?.role || 'customer',
        };
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        set({
          user: userData,
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

  verifyOTP: async (userId, otp) => {
    set({ isLoading: true });
    try {
      const response = await authAPI.verifyOTP(userId, otp);
      if (response.success) {
        // ✅ Verify OTP ma role store
        const userData = {
          id: response.user?.id || userId,
          fullName: response.user?.fullName || 'User',
          email: response.user?.email || '',
          phone: response.user?.phone || '',
          role: response.user?.role || 'customer', // ✅ Role saved!
          walletBalance: response.user?.walletBalance || 0,
        };
        await AsyncStorage.setItem('authToken', response.token);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        set({
          user: userData,
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
      set({ user: null, token: null, isAuthenticated: false });
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
        const parsed = JSON.parse(userData);
        console.log('👤 Loaded user:', parsed); // ✅ Debug
        set({
          token,
          user: parsed,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Load user error:', error);
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
}));

export default useAuthStore;
