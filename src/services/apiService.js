import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getCurrentUser: () => api.get('/api/auth/me')
};

export const carAPI = {
  getAll: () => api.get('/api/cars'),
  getById: (id) => api.get(`/api/cars/${id}`),
  create: (carData) => api.post('/api/cars', carData),
  update: (id, carData) => api.put(`/api/cars/${id}`, carData),
  delete: (id) => api.delete(`/api/cars/${id}`),
  search: (filters) => api.get('/api/cars/search', { params: filters })
};

export const bookingAPI = {
  getAll: () => api.get('/api/bookings'),
  create: (bookingData) => api.post('/api/bookings', bookingData),
  updateStatus: (id, status) => api.patch(`/api/bookings/${id}/status`, { status }),
  getByUser: (userId) => api.get(`/api/bookings/user/${userId}`)
};

// Handle errors
api.interceptors.response.use(
  response => response,
  error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
  }
    return Promise.reject(error);
  }
);

export default api;
