import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (email, password) => {
  try {
    const credentials = { email, password };
    console.log('Login request:', credentials);
    const response = await axios.post(`${API_BASE_URL}/login`, JSON.stringify(credentials), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  // Clear token nếu không phải JWT hợp lệ
  if (typeof token !== 'string' || token.split('.').length !== 3) {
    localStorage.removeItem('token');
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(decodedPayload);
    return {
      email: payload.sub || payload.email,
      roles: payload.roles || []
    };
  } catch (error) {
    console.error('Token decode error:', error);
    localStorage.removeItem('token');
    return null;
  }
};

export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  console.log('Current token:', token);
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('Token payload:', payload);
    } catch (e) {
      console.error('Error decoding token:', e);
    }
  }
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
