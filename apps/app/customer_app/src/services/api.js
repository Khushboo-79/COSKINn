import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// We use localhost so that physical Android devices can connect via 'adb reverse tcp:3000 tcp:3000'
// The backend uses a global prefix '/api', so we must append it.
const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error fetching token from storage', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

import Toast from 'react-native-toast-message';

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // Handle unauthorized (Session expired)
        await AsyncStorage.removeItem('access_token');
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please log in again.',
          position: 'top',
        });
        // In a real app, you would dispatch a logout action here or trigger a navigation event
      } else if (status >= 500) {
        // Server Error
        Toast.show({
          type: 'error',
          text1: 'Server Error',
          text2: 'Something went wrong on our end. Please try again later.',
          position: 'top',
        });
      } else if (status >= 400 && status !== 401 && status !== 404) {
        // For client errors, we typically let the local thunk handle it or show a generic message
        const message = data?.message || data?.error || 'An error occurred';
        // Optional: show a generic toast for all client errors, but we rely on local component alerts for forms usually
      }
    } else if (error.request) {
      // Network Error / Timeout
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Please check your internet connection.',
        position: 'top',
      });
    }
    return Promise.reject(error);
  }
);

export default api;
