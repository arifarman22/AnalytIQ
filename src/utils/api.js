import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  timeout: 120_000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: handle 401, sanitize errors
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    // Sanitize error message — never expose raw server internals
    const detail = err.response?.data?.detail;
    const safeMessage =
      typeof detail === 'string' ? detail :
      Array.isArray(detail) ? detail.map(d => d.msg || d).join(', ') :
      err.message === 'Network Error' ? 'Unable to reach server. Please check your connection.' :
      err.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' :
      'Something went wrong. Please try again.';

    err.safeMessage = safeMessage;
    return Promise.reject(err);
  }
);

export default api;
