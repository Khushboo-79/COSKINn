import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Optionally add a mock auth token if backend requires it during local dev
api.interceptors.request.use(async (config) => {
  // If we had a real login, we would attach the token here.
  // We attach a dummy one in case the backend requires a Bearer token layout
  config.headers.Authorization = `Bearer mock-admin-token`;
  return config;
});
